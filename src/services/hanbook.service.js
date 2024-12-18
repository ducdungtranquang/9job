import { fetchClient } from "api/app.service";
import { CREATE_ENDPOINT, HANDBOOK, HOST } from "constants/Api";

export const getAllHandbook = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${HANDBOOK}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const getHandbookById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${HANDBOOK}/${id}`,)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const createNewHandbook = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${HANDBOOK}${CREATE_ENDPOINT}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const updateHandbook = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${HANDBOOK}/${data.id}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteHandbook = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${HANDBOOK}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

