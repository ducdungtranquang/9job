import { fetchClient } from "api/app.service";
import { HOST, JOB } from "constants/Api";

export const getAlJob = async (params) => {
  console.log("check params: ", params);
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${JOB}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const accecptJob = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .patch(`${HOST}${JOB}/approve/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const rejectJob = async (id, data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .patch(`${HOST}${JOB}/unapprove/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateJobDataById = async (id, data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${JOB}/${id}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
