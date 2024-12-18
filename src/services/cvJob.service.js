import { fetchClient } from "api/app.service";
import { CVJOB_ADMIN, GETALL_JOB_CV, HOST } from "constants/Api";

export const getAllCVJob = async (params) => {
  return fetchClient(true)
    .get(`${HOST}${GETALL_JOB_CV}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const accecptCVJob = async (id, data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${CVJOB_ADMIN}/${id}/approve`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const rejectCVJob = async (id, data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${CVJOB_ADMIN}/${id}/cancel`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
