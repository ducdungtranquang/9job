import { fetchClient } from "api/app.service";
import { DASHBOARD, HOST, USER_COIN_ADMIN, USER_COURSE_ADMIN, USER_LOGIN_ADMIN, USER_REGISTER_ADMIN } from "constants/Api";

export const getDashboard = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${DASHBOARD}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const getUserLoginPerDay = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${USER_LOGIN_ADMIN}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getUserRegisterPerDay = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${USER_REGISTER_ADMIN}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const getUserCoinLimit = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${USER_COIN_ADMIN}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const getUserCourseByMonth = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${USER_COURSE_ADMIN}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

