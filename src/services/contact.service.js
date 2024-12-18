import { fetchClient } from "api/app.service";
import { DELETE_ENDPOINT, HOST, SEND_MAIL_PREFIX, UPDATE_ENDPOINT } from "constants/Api";


export const getContactList = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${SEND_MAIL_PREFIX}`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const getContactById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${SEND_MAIL_PREFIX}/${id}`,)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};



export const updateContactById = async (id, data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${SEND_MAIL_PREFIX}${UPDATE_ENDPOINT}/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
};


export const deleteContactById = async (id) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .delete(`${HOST}${SEND_MAIL_PREFIX}${DELETE_ENDPOINT}/${id}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

