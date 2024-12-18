import { yupResolver as FormResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import Card from "components/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";

import InputField from "components/fields/InputField";
import InputRadio from "components/fields/InputRadio";
import InputUpload from "components/fields/InputUpload";
import QuillEditor from "components/reactDraftEditor";
import { USER_CATEGORY } from "constants/CategoryConstant";
import { REVIEWS_FOLDER } from "constants/FileNameConstant";
import { createNewReview, updateReview } from "services/reviews.service";
import { resetReviewsForm, setNewReviews, updateReviewsById } from "store/reviewsReducer";
import { newsReviewSchema } from "utils";
import { uploadImageToStorage } from "utils/helpers";

const inputCs = "border border-solid border-brand-500 z-50";

const CreateNewReview = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { reviewDetail } = useSelector((state) => state.reviews);

  const [thumbnail, setThumbnail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: reviewDetail,
    mode: "onBlur",
    resolver: FormResolver(newsReviewSchema()),
  });

  const onRefresh = () => {
    reset();
    setIsSubmit(false);
    toggleCreate(false);
    dispatch(resetReviewsForm());
  };

  const onSubmit = async (data) => {
    setIsSubmit(true);

    try {
      let submitData = data;
      submitData.category = category;
      if (thumbnail) {
        submitData.thumbnail = thumbnail
          ? await uploadImageToStorage(thumbnail, "thumbnail", REVIEWS_FOLDER)
          : null;
      }
      const response = await createNewReview(submitData);

      if (response) {
        showToastMessage("Tạo thành thành công", "success");
        dispatch(setNewReviews(response.data.data));
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
        submitData.thumbnail = thumbnail
          ? await uploadImageToStorage(thumbnail, "thumbnail", REVIEWS_FOLDER)
          : null;
      }

      const response = await updateReview(submitData);
      if (response) {
        showToastMessage("Cập nhật thành thành công", "success");
        dispatch(
          updateReviewsById({
            id: reviewDetail?.id,
            data: response.data.data,
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
    if (reviewDetail?.id) {
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
                {reviewDetail?.id ? "Cập nhật" : "Tạo"}
              </button>
            </div>
          </header>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <label>
                Hình ảnh <span className="my-2 text-red-500">*</span>
              </label>
              <InputUpload
                fileUrl={reviewDetail?.thumbnail}
                setImg={setThumbnail}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                variant="auth"
                extra="mb-3"
                label="Tiêu đề/Tên"
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
                id="active"
                type="text"
                inputCS={inputCs}
                name="active"
                defaultValue={reviewDetail?.active ?? 1}
                register={register("active")}
                item={[
                  {
                    label: "Hoạt động",
                    value: 1,
                    name: "active",
                  },
                  {
                    label: "Không hoạt động",
                    value: 0,
                    name: "active",
                  },
                ]}
              />
            </Grid>
            <Grid item xs={6} md={12}>
              <InputField
                variant="auth"
                extra="mb-3"
                label="Tên tổ chức"
                required={true}
                id="company_name"
                inputCS={inputCs}
                name="company_name"
                register={register("company_name")}
                helperText={
                  errors.company_name ? errors.company_name.message : ""
                }
              />
              <InputField
                variant="auth"
                extra="mb-3"
                label="Vị trí"
                required={true}
                id="company_position"
                inputCS={inputCs}
                name="company_position"
                register={register("company_position")}
                helperText={
                  errors.company_position ? errors.company_position.message : ""
                }
              />

              <InputField
                variant="auth"
                extra="mb-3"
                label="Đường dẫn"
                required={true}
                id="link"
                inputCS={inputCs}
                name="link"
                register={register("link")}
                helperText={errors.link ? errors.link.message : ""}
              />
              {category == USER_CATEGORY && (
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Đánh giá"
                  required={true}
                  id="rating"
                  inputCS={inputCs}
                  name="rating"
                  type="number"
                  register={register("rating")}
                />
              )}
             
              <QuillEditor
                label="Mô tả"
                required={true}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                name="description"
                value={reviewDetail?.description}
                setValue={setValue}
                register={register("description")}
              />
            </Grid>
          </Grid>
        </Card>
        <Box className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-brand-500 px-5 py-2 normal-case text-white dark:bg-white dark:text-navy-700"
          >
            {reviewDetail?.id ? "Cập nhật" : "Tạo"}
          </button>
        </Box>
      </form>
    </div>
  );
};

export default CreateNewReview;
