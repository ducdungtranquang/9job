import { fetchClient } from "api/app.service";
import { GET_ALL, HOST, UNIVERSITY } from "constants/Api";


export const getUniversityList = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${UNIVERSITY}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
export const getUniversityListByAdmin = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${UNIVERSITY}${GET_ALL}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};
export const getUniversityById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${UNIVERSITY}/${id}`,)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const createNewUniversity = async ( data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${UNIVERSITY}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateUniversity = async ( data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${UNIVERSITY}/${data.id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const deleteUniversity = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${UNIVERSITY}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

