import { fetchClient } from "api/app.service";
import { CAREER_ROUTEMAP, CREATE_ENDPOINT, HOST } from "constants/Api";


export const getCareerRoutemapList = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${CAREER_ROUTEMAP}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCareerRoutemapById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${CAREER_ROUTEMAP}/${id}`,)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const createCareerRoute = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${CAREER_ROUTEMAP}${CREATE_ENDPOINT}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const updateCareerRoutemapById = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${CAREER_ROUTEMAP}/${data.id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const deleteCareerRoutemapById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${CAREER_ROUTEMAP}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

