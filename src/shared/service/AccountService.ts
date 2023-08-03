import instance from "../config/interceptor";

export const loginAccount = async (data: Record<string, any>) => {
  let _response;
  try {
    // DY: CHANGE THIS API URL FOR LOGIN
    const response = await instance.post(`/Auth/Login`, data, {
      headers: { "Content-Type": "application/json" },
    });
    _response = response;
  } catch (err) {
    _response = err;
  }
  return _response;
};

export const getAccountContent = async (username: string) => {
  let _response;
  try {
    // DY: CHANGE THIS API URL FOR GET DETAIL LOGIN ACCOUNT
    const response = await instance.get(
      `/Profile/ProfileAccountGet/${username}`
    );
    _response = response;
  } catch (err) {
    _response = err;
  }
  return _response;
};
