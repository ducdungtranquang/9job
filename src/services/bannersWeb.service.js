import { fetchClient } from "api/app.service";
import { BANNER_WEB_ENDPOINT, HOST } from "constants/Api";

export const getAllBannersWeb = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${BANNER_WEB_ENDPOINT}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const getBannerWebById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${BANNER_WEB_ENDPOINT}/${id}`,)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const createNewBannerWeb = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${BANNER_WEB_ENDPOINT}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const updateBannerWeb = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${BANNER_WEB_ENDPOINT}/${data.id}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteBannerWeb = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${BANNER_WEB_ENDPOINT}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

