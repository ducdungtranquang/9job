import { fetchClient } from "api/app.service";
import { HOST, MENTOR_PREFIX, PREFIX_ADMIN, } from "constants/Api";


export const getMentorList = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${PREFIX_ADMIN}${MENTOR_PREFIX}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getMentorDetailById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${PREFIX_ADMIN}${MENTOR_PREFIX}/${id}`,)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};



export const updateActiveMentorById = async (id, data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${PREFIX_ADMIN}${MENTOR_PREFIX}/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const deleteMentorById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${PREFIX_ADMIN}${MENTOR_PREFIX}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

