import { fetchClient } from "api/app.service";
import { COMPANY, HOST, SET_ADS_COMPANY } from "constants/Api";

export const getCompanies = async (params) => {
  // Use fetchClient() when call api have token

  return fetchClient(true)
    .get(`${HOST}${COMPANY}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const accecptCompany = async (params) => {
  // Use fetchClient() when call api have token
  const { id, is_ads } = params;
  return fetchClient(true)
    .put(`${HOST}${SET_ADS_COMPANY}/${id}/${is_ads}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const rejectCompany = async (params) => {
  // Use fetchClient() when call api have token
  const { id, is_ads } = params;
  return fetchClient(true)
    .put(`${HOST}${SET_ADS_COMPANY}/${id}/${is_ads}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
