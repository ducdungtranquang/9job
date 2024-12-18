import { fetchClient } from "api/app.service";
import { FANPAGE_ENDPOINT, HOST } from "constants/Api";

export const getAllFanpage = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${FANPAGE_ENDPOINT}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const getFanpageById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${FANPAGE_ENDPOINT}/${id}`,)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const createNewFanpage = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${FANPAGE_ENDPOINT}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const updateFanpage = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${FANPAGE_ENDPOINT}/${data.id}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteFanpage = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${FANPAGE_ENDPOINT}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

