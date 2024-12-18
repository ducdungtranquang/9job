import { Box, Button, CircularProgress, Grid } from "@mui/material";
import Card from "components/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";

import { yupResolver as FormResolver } from "@hookform/resolvers/yup";
import InputField from "components/fields/InputField";
import InputSelect from "components/fields/InputSelect";
import InputUpload from "components/fields/InputUpload";
import TextField from "components/fields/TextField";
import { INSTRUCTOR_FOLDER } from "constants/FileNameConstant";
import {
  createNewInstructor,
  updateInstructor,
} from "services/instructor.service";
import {
  resetInstructorForm,
  setNewInstructor,
  updateInstructorById,
} from "store/instructorReducer";
import { instructorSchema } from "utils";
import { uploadImageToStorage } from "utils/helpers";

const inputCs = "border border-solid border-brand-500 z-50";

const CreateInstructorForm = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { listUniversities } = useSelector((state) => state.universities);
  const { introductorDetail } = useSelector((state) => state.instructors);
  const [thumbnail, setThumbnail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: introductorDetail,
    mode: "onBlur",
    resolver: FormResolver(instructorSchema()),
  });

  const onRefresh = () => {
    reset();
    setIsSubmit(false);
    toggleCreate(false);
    dispatch(resetInstructorForm());
  };

  const onSubmit = async (data) => {
    setIsSubmit(true);

    try {
      let submitData = data;
      submitData.student_category_id = category;
      if (thumbnail) {
        submitData.avatar = thumbnail
          ? await uploadImageToStorage(thumbnail, "thumbnail", INSTRUCTOR_FOLDER)
          : null;
      }
      const response = await createNewInstructor(submitData);
      if (response) {
        showToastMessage("Tạo thành thành công", "success");
        dispatch(setNewInstructor(response.data.data));
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
        submitData.avatar = thumbnail
          ? await uploadImageToStorage(
              thumbnail,
              "thumbnail",
              INSTRUCTOR_FOLDER
            )
          : null;
      }

      const response = await updateInstructor(submitData);
      if (response) {
        showToastMessage("Cập nhật thành thành công", "success");
        dispatch(
          updateInstructorById({
            id: introductorDetail?.id,
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
    if (introductorDetail?.id) {
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
                {introductorDetail?.id ? "Cập nhật" : "Tạo"}
              </button>
            </div>
          </header>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <label>
                Avatar <span className="my-2 text-red-500">*</span>
              </label>
              <InputUpload
                fileUrl={introductorDetail?.avatar}
                setImg={setThumbnail}
              />
            </Grid>
          </Grid>

          <Box className="grid grid-cols-1 gap-2 md:grid-cols-2">
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
            <InputField
              variant="auth"
              extra="mb-3"
              label="SDT"
              required={true}
              id="phone"
              type="text"
              inputCS={inputCs}
              name="phone"
              register={register("phone")}
              helperText={errors.phone ? errors.phone.message : ""}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email"
              required={true}
              id="email"
              type="email"
              inputCS={inputCs}
              name="email"
              register={register("email")}
              helperText={errors.email ? errors.email.message : ""}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Tên công ty"
              required={true}
              id="company_name"
              type="text"
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
              label="Vị trí làm việc"
              required={true}
              id="company_position"
              type="text"
              inputCS={inputCs}
              name="company_position"
              register={register("company_position")}
              helperText={
                errors.company_position ? errors.company_position.message : ""
              }
            />
            <InputSelect
              value={introductorDetail?.school_id}
              data={listUniversities || []}
              variant="auth"
              extra="mb-3"
              label="Trường học"
              required={true}
              id="school_id"
              inputCS={inputCs}
              name="school_id"
              register={register("school_id")}
              helperText={errors.school_id ? errors.school_id.message : ""}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Trình độ học vấn"
              required={true}
              id="education_level"
              type="text"
              inputCS={inputCs}
              name="education_level"
              register={register("education_level")}
              helperText={
                errors.education_level ? errors.education_level.message : ""
              }
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Năm kinh nghiệm"
              required={true}
              id="year_of_experience"
              type="number"
              inputCS={inputCs}
              name="year_of_experience"
              register={register("year_of_experience")}
              helperText={
                errors.year_of_experience
                  ? errors.year_of_experience.message
                  : ""
              }
            />
          </Box>
          <TextField
            variant="auth"
            extra="mb-3"
            label="Mô tả"
            required={false}
            id="description"
            inputCS={inputCs}
            name="description"
            register={register("description")}
            rows={5}
          />
        </Card>
        <Box className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-brand-500 px-5 py-2 normal-case text-white dark:bg-white dark:text-navy-700"
          >
            {introductorDetail?.id ? "Cập nhật" : "Tạo"}
          </button>
        </Box>
      </form>
    </div>
  );
};

export default CreateInstructorForm;
