import { fetchClient } from "api/app.service";
import { GET_ALL, HOST, MENTOR_RATING_DETAIL, MENTOR_RATING_ENDPOINT, } from "constants/Api";


export const getMentorRatingList = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${MENTOR_RATING_ENDPOINT}${GET_ALL}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMentorRatingDetailById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${MENTOR_RATING_ENDPOINT}${MENTOR_RATING_DETAIL}/${id}`,)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMentorRatingByMentorId = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${MENTOR_RATING_ENDPOINT}/${id}`,)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const updateMentorRatingById = async (id, data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${MENTOR_RATING_ENDPOINT}/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const deleteRatingById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${MENTOR_RATING_ENDPOINT}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

