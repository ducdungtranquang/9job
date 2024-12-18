import { yupResolver as FormResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import Card from "components/card";
import InputUploadSquare from "components/fields/InputUploadSquare";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";

import InputField from "components/fields/InputField";
import InputRadio from "components/fields/InputRadio";
import QuillEditor from "components/reactDraftEditor";
import { UNIVERSITY_FOLDER } from "constants/FileNameConstant";
import { createNewUniversity, updateUniversity } from "services/university.service";
import { setNewBanners } from "store/bannersReducer";
import { resetUniversityForm, updateUniversityById } from "store/universityReducer";
import { universitySchema } from "utils";
import { uploadImageToStorage } from "utils/helpers";

const inputCs = "border border-solid border-brand-500 z-50";

const CreateUniversity = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { universityDetail } = useSelector((state) => state.universities);
  const [thumbnail, setThumbnail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: universityDetail,
    mode: "onBlur",
    resolver: FormResolver(universitySchema()),
  });

  const onRefresh = () => {
    reset();
    setIsSubmit(false);
    toggleCreate(false);
    dispatch(resetUniversityForm());
  };

  const onSubmit = async (data) => {
    setIsSubmit(true);

    try {
      let submitData = data;
      if (thumbnail) {
        submitData.logo_url = thumbnail
          ? await uploadImageToStorage(
              thumbnail,
              "thumbnail",
              UNIVERSITY_FOLDER
            )
          : null;
      }
      const response = await createNewUniversity(submitData);
      if (response) {
        showToastMessage("Tạo thành thành công", "success");
        dispatch(setNewBanners(response.data.data));
        onRefresh();
      }
    } catch (error) {
      const msg = error?.message || "Đã xảy ra lỗi, vui lòng kiểm tra lại";
      showToastMessage(msg, "error");
      setIsSubmit(false);
    }
  };

  const onUpdate = async (data) => {
    try {
      let submitData = data;
      setIsSubmit(true);
      if (thumbnail) {
        submitData.logo_url = thumbnail
          ? await uploadImageToStorage(
              thumbnail,
              "thumbnail",
              UNIVERSITY_FOLDER
            )
          : null;
      }

      const response = await updateUniversity(submitData);

      if (response) {
        showToastMessage("Cập nhật thành thành công", "success");
        dispatch(
          updateUniversityById({
            id: universityDetail?.id,
            data: response.data,
          })
        );
        toggleCreate(false);
      }
      setIsSubmit(false);
    } catch (error) {
      const msg = error?.message || "Đã xảy ra lỗi, vui lòng kiểm tra lại";
      showToastMessage(msg, "error");
      setIsSubmit(false);
    }
  };

  const handleSendData = async (data) => {
    if (universityDetail?.id) {
      await onUpdate(data);
    } else {
      await onSubmit(data);
    }
  };

  function showToastMessage(msg, servity) {
    dispatch(setIsToastMessageShow());
    dispatch(
      setMessage({
        message: msg,
        severity: servity,
      })
    );
  }

  return (
    <div>
      {isSubmit && (
        <Box className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-white/10">
          <CircularProgress />
        </Box>
      )}
      <Button
        onClick={onRefresh}
        className="normal-case text-gray-600 dark:text-white"
      >
        <MdOutlineArrowBack className="h-6 w-6" /> Quay lại
      </Button>
      <form onSubmit={handleSubmit(handleSendData)}>
        <Card extra={"w-full h-full px-6 py-5 my-5"}>
          <header className="relative flex items-center justify-between pt-4">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-xl font-bold text-navy-700 dark:text-white">
                Nhập thông tin{" "}
                <span className="text-sm font-thin text-red-500">
                  (* là bắt buộc)
                </span>
              </h2>
              <button
                type="submit"
                className="rounded-md bg-brand-500 px-5 py-2 normal-case text-white dark:bg-white dark:text-navy-700"
              >
                {universityDetail?.id ? "Cập nhật" : "Tạo"}
              </button>
            </div>
          </header>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <label>
                Hình ảnh <span className="my-2 text-red-500">*</span>
              </label>
              <InputUploadSquare
                fileUrl={universityDetail?.logo_url}
                setImg={setThumbnail}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                variant="auth"
                extra="mb-3"
                label="Tên"
                required={true}
                id="name"
                type="text"
                inputCS={inputCs}
                name="name"
                register={register("name")}
                helperText={errors.name ? errors.name.message : ""}
              />
              <InputRadio
                variant="auth"
                extra="mb-3"
                label="Trạng thái"
                id="status"
                type="text"
                inputCS={inputCs}
                name="status"
                defaultValue={universityDetail?.status || "active"}
                register={register("status")}
                item={[
                  {
                    label: "Hoạt động",
                    value: "active",
                    name: "status",
                  },
                  {
                    label: "Không hoạt động",
                    value: "inactive",
                    name: "status",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={12}>

              <QuillEditor
                label="Mô tả"
                required={true}
                name="description"
                value={universityDetail?.description}
                setValue={setValue}
                register={register("description")}
              />
              <InputField
                variant="auth"
                extra="mb-3"
                label="Địa chỉ"
                required={true}
                id="address"
                inputCS={inputCs}
                name="address"
                register={register("address")}
                helperText={errors.address ? errors.address.message : ""}
              />
            </Grid>
          </Grid>
        </Card>
        <Box className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-brand-500 px-5 py-2 normal-case text-white dark:bg-white dark:text-navy-700"
          >
            {universityDetail?.id ? "Cập nhật" : "Tạo"}
          </button>
        </Box>
      </form>
    </div>
  );
};

export default CreateUniversity;
