import { fetchClient } from "api/app.service";
import { HOST, IMAGE_ENDPOINT, UPLOAD_MEDIA, UPLOAD_URL } from "constants/Api";

export const uploadMedia = async (hasToken, formFile) => {
  var formData = new FormData();
  formData.append("file", formFile);
  return fetchClient(hasToken, true)
    .post(UPLOAD_MEDIA, formData)
    .then((res) => {
      let urlFile = "";
      if (res?.data && res?.data.length > 0) {
        urlFile = res?.data[0].url;
      }
      return urlFile;
    })
    .catch((error) => {
      throw error;
    });
};

export const uploadVideoMedia = async (hasToken, formFile,) => {
  var formData = new FormData();
  formData.append("file", formFile);
  return fetchClient(hasToken, true)
    .post(UPLOAD_MEDIA, formData)
    .then((res) => {
      let urlFile = "";
      if (res?.data && res?.data.length > 0) {
        urlFile = res?.data[0].url;
      }
      return urlFile;
    })
    .catch((error) => {
      throw error;
    });
};


export const uploadImage = async (hasToken, formFile, fileName = 'image', folderName = 'images') => {
  var formData = new FormData();
  formData.append(fileName, formFile);
  formData.append("fileName", fileName);
  formData.append("folderName", folderName);

  return fetchClient(hasToken, true)
    .post(`${HOST}${UPLOAD_URL}${IMAGE_ENDPOINT}`, formData)
    .then((res) => {
      if (res?.data?.success) {
        return res.data.storageUrl
      }
    })
    .catch((error) => {
      throw error;
    });
};
