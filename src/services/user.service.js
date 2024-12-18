import { fetchClient } from "api/app.service";
import axios from "axios";
import { EXPORT_DATA, HOST, INFO_USER, LOGIN, REGISTER, UPDATE_PROFILE, USER_ADMIN } from "constants/Api";

export const register = async (data) => {
  return axios
    .post(`${HOST}${REGISTER}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const login = async (data) => {
  return axios
    .post(`${HOST}${LOGIN}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const getInfoUser = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${INFO_USER}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const getAllUser = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${USER_ADMIN}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const updateUserProfileFromAdmin = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${USER_ADMIN}${UPDATE_PROFILE}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteUserByIdFromAdmin = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${USER_ADMIN}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};


export const exportData = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${USER_ADMIN}${EXPORT_DATA}`, {params})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};


// const handleError = (error) => {
//   if (error.response) {
//     return error.response.data;
//   } else {
//     return error.message;
//   }
// };
