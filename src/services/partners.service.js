import { fetchClient } from "api/app.service";
import { HOST, PARTNERS_ENDPOINT } from "constants/Api";

export const getAllPartners = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${PARTNERS_ENDPOINT}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const getPartnerById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${PARTNERS_ENDPOINT}/${id}`,)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const createNewPartner = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${PARTNERS_ENDPOINT}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const updatePartner = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${PARTNERS_ENDPOINT}/${data.id}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const deletePartner = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${PARTNERS_ENDPOINT}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

