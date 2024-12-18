/* eslint-disable no-undef */
import axios from "axios";
import { endPoint } from "configs/env";
import { AUTHENTICATION } from "constants/AuthConstant";
import { getItemFromCookieStorage } from "utils/cookie";
import { getFromLocalStorage } from "utils/local-storage";

export const fetchClient = (isToken, isFile = false) => {
  const token = getItemFromCookieStorage(AUTHENTICATION);

  const configHeader = {
    "Content-type": isFile
      ? "multipart/form-data"
      : "application/json; charset=utf-8",
      "ngrok-skip-browser-warning": "true",
    'Access-Control-Allow-Origin': "*",
  };

  const defaultConfig = {
    baseURL: endPoint[process.env.NODE_ENV],
    headers: configHeader,
  };

  if (isToken) {
    defaultConfig.headers.Authorization = "Bearer " + token;
  }

  let instance = axios.create(defaultConfig);

  /* handle refresh token */
  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalRequest = err.config;
      if (err.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // todo
        const res = await getFromLocalStorage(AUTHENTICATION);
        const newToken = res?.token;
        if (!newToken || !token) return Promise.reject(err);
        originalRequest.headers.Authorization = 'Bearer ' + newToken;
        setLocalStorage(AUTHENTICATION, newToken);
        return instance.request(originalRequest);
      }

      return Promise.reject(err);
    }
  );

  return instance;
};
