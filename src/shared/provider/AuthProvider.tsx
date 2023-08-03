import React, { useContext, createContext, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import {
  setItemToStorage,
  clearItemStorage,
  getItemStorage,
} from "../lib/utils";
import { useRouter } from "next/router";
import { Spin } from "antd";
import ModalStatus from "../components/ModalStatus";
import { getAccountContent, loginAccount } from "../service/AccountService";

interface AuthProviderProps {
  children: React.ReactNode;
}

export interface LoginCredentialProps {
  username: string;
  password: string;
}

interface AuthContextProps {
  userDetail: any;
  isAuthenticated: boolean;
  handleLogout: () => void;
  handleLogin: (value: LoginCredentialProps) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  userDetail: null,
  isAuthenticated: false,
  handleLogout: () => {},
  handleLogin: () => {},
});

export const useAuthentication = () => useContext(AuthContext);

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [userDetail, setUserDetail] = useState<any>(null);

  const { mutate: mutateGetAccountContent } = useMutation(getAccountContent, {
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setItemToStorage("userDetail", res.data);
        setIsAuthenticated(true);
        setIsLoadingLogin(false);
      } else {
        ModalStatus({
          status: "error",
          title: "Terjadi Kesalahan!!!",
          content: res.response?.data?.Message,
        });
      }
    },
  });

  const { mutate: mutateLogin } = useMutation(loginAccount, {
    onSuccess: (res: any) => {
      if (res.status === 200) {
        setItemToStorage("token", res.data.token);
        setItemToStorage("tokenRefresh", res.data.tokenRefresh);
        mutateGetAccountContent(username);
      } else {
        setIsAuthenticated(false);
        setIsLoadingLogin(false);
        ModalStatus({
          status: "error",
          title: "Nama Pengguna atau Sandi anda salah",
          content: `Silahkan coba lagi`,
        });
      }
    },
  });

  //   DY: GET DATA IN LOCALSTORAGE TO STATE IF USER LOGIN
  useEffect(() => {
    if (!!isAuthenticated) {
      setUsername(getItemStorage("username") || "");
      setUserDetail(getItemStorage("userDetail"));
    }
  }, [isAuthenticated]);

  //   DY: CONDITION WHEN USER LOGIN IS SUCCESS, REDIRECT TO ROOT PAGE AND MODAL SUCCESS
  useEffect(() => {
    if (!isLoadingLogin && !!isAuthenticated) {
      router.push("/");
      //   DY: HIDE MODAL WHEN U DONT NEED
      ModalStatus({
        status: "success",
        title: "Berhasil masuk",
        content: `Anda sekarang adalah ${username}`,
      });
    }
  }, [isLoadingLogin, isAuthenticated]);

  //   DY: Check when the website is opened for the first time, whether the user session still exists or not

  //   WARNING
  //   DY: PLEASE UNCOMENT WHEN U DONE CREATE FEATURE LOGIN
  //   useEffect(() => {
  //     const userDetail = getItemStorage("userDetail") || null;
  //     setUserDetail(userDetail);

  //     if (!userDetail) {
  //       router.push("/login");
  //     }
  //     if (userDetail && pathname === "/login") {
  //       router.push("/");
  //     }
  //   }, []);

  const handleLogin = ({ username, password }: LoginCredentialProps) => {
    setIsLoadingLogin(true);
    setUsername(username);
    setItemToStorage("username", username);
    mutateLogin({ username, password });
  };

  const handleLogout = () => {
    clearItemStorage();
    router.push("/login");
  };

  const auth = {
    userDetail,
    isAuthenticated,
    handleLogout,
    handleLogin,
  };

  return (
    <AuthContext.Provider value={{ ...auth }}>
      <Spin spinning={isLoadingLogin} size="large" className="tw-max-h-full">
        {children}
      </Spin>
    </AuthContext.Provider>
  );
}
