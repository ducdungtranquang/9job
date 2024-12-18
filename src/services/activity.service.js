import { fetchClient } from "api/app.service";
import { ACTIVITY, CREATE_ACTIVITY, HOST } from "constants/Api";

export const getAllActivities = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${ACTIVITY}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const getActivityById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${ACTIVITY}/${id}`,)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};


export const createActivities = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${CREATE_ACTIVITY}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateActivities = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${ACTIVITY}/${data.id}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteActivity = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${ACTIVITY}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};