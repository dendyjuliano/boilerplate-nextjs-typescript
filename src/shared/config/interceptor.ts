import axios, { AxiosResponse } from "axios";
import { notification } from "antd";
import {
  getItemStorage,
  clearItemStorage,
  setItemToStorage,
} from "../lib/utils";

let isRefreshing = false;
let failedQueue: any = [];

const openNotification = () => {
  notification.warning({
    message: "Sesi berakhir",
    description: "Silahkan login kembali",
    onClick: () => {
      console.log("DY: Notification Clicked!");
    },
  });
};

const processQueue = (error: any, token = null) => {
  if (error) {
    // DY: FOR LOGOUT AND CLEAR TOKEN
    clearItemStorage();
    openNotification();
  } else {
    setItemToStorage("token", token);
    // DY: FOR CHANGE TOKEN AND REFRESH TOKEN
  }
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// INTERCEPTOR REQUEST
instance.interceptors.request.use(
  async (config: any) => {
    const unAuthenticatedUrls = ["login", "license", "Setting"];
    if (unAuthenticatedUrls.indexOf(config.url) === -1) {
      const token = getItemStorage("token");
      config.headers["Authorization"] = "Bearer " + token;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    return Promise.reject(error as AxiosResponse);
  }
);

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<any>(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return instance(originalRequest);
            })
            .catch((err) => {
              return err;
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const token = getItemStorage("token");
        const tokenRefresh = getItemStorage("tokenRefresh");
        return new Promise<any>(function (resolve, reject) {
          axios
            .post(
              `${process.env.NEXT_PUBLIC_URL}/Token/refresh/${tokenRefresh}`,
              `"${token}"`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then(({ data }: AxiosResponse) => {
              instance.defaults.headers.common["Authorization"] =
                "Bearer " + data.token;
              originalRequest.headers["Authorization"] = "Bearer " + data.token;
              processQueue(null, data.token);
              resolve(instance(originalRequest));
            })
            .catch((err) => {
              console.log("DY: this is error happend 2");
              processQueue(err, null);
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      } else if (
        error.response.status === 500 &&
        (error.response.data.message ===
          "Token Signature could not be verified." ||
          error.response.data.message === "The token has been blacklisted")
      ) {
        // window.location.replace('/login');
        console.log("Session expired. Please login again.");
        // toast.error("Session expired. Please login again.");
      }
    } else {
      console.log(error.message);
      //   toast.error(error.message);
    }

    return Promise.reject(error as AxiosResponse);
  }
);

export default instance;
