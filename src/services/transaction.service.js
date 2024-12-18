import { fetchClient } from "api/app.service";
import {
  GETAll_COIN_REFUND_FOR_PARTNER,
  GETALL_COIN_USER_USED,
  GETAll_COURSEPURCHASE,
  GETAll_TRANSACTION,
  GETAll_TRANSFER_INFO,
  HOST,
  UPDATE_COURSEPURCHASE_STATUS,
} from "constants/Api";

export const getAllTransaction = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${GETAll_TRANSACTION}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const getAllCoursePurchase = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${GETAll_COURSEPURCHASE}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const updateStatusPurchase = async (data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .patch(`${HOST}${UPDATE_COURSEPURCHASE_STATUS}/${data.id}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const getAllCoinUsed = async () => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .post(`${HOST}${GETALL_COIN_USER_USED}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const getAllCoinRefund = async () => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${GETAll_COIN_REFUND_FOR_PARTNER}`)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};

export const getAllTransferInfo = async (params) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .get(`${HOST}${GETAll_TRANSFER_INFO}`, { params: params })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};


export const updateTransferInfo = async (id, data) => {
  // Use fetchClient() when call api have token
  return fetchClient(true)
    .put(`${HOST}${GETAll_TRANSFER_INFO}/${id}`, data)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      throw error;
    });
};
