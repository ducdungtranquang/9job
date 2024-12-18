import { fetchClient } from "api/app.service";
import { COURSE_ADMIN, CREATE_ENDPOINT, DELETE_ENDPOINT, HOST, UPDATE_ENDPOINT } from "constants/Api";

export const getAllCourse = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${COURSE_ADMIN}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const getCourseById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${COURSE_ADMIN}/${id}`,)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const createNewCourse = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${COURSE_ADMIN}${CREATE_ENDPOINT}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
export const updateCourse = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${COURSE_ADMIN}${UPDATE_ENDPOINT}/${data.id}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteCourse = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${COURSE_ADMIN}${DELETE_ENDPOINT}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

