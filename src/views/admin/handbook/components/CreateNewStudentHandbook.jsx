/* eslint-disable eqeqeq */
import { yupResolver as FormResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import Card from "components/card";
import InputUploadSquare from "components/fields/InputUploadSquare";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";

import InputField from "components/fields/InputField";
import InputSelect from "components/fields/InputSelect";
import QuillEditor from "components/reactDraftEditor";
import { HANDBOOK_FOLDER } from "constants/FileNameConstant";
import { radioCategoriesList } from "constants/SelectConstant";
import { createNewHandbook, updateHandbook } from "services/hanbook.service";
import {
  resetHandbookForm,
  setNewHandbook,
  updateHandbookById,
} from "store/handbookReducer";
import { handbookSchema } from "utils";
import { uploadImageToStorage } from "utils/helpers";

const inputCs = "border border-solid border-brand-500 z-50";

const CreateNewStudentHandbook = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { handbookDetail } = useSelector((state) => state.handbooks);
  const { listUniversities } = useSelector((state) => state.universities);
  const [thumbnail, setThumbnail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [tagList, setTagList] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: handbookDetail,
    mode: "onBlur",
    resolver: FormResolver(handbookSchema()),
  });

  useEffect(() => {
    const radioUpdate =
      radioCategoriesList?.find((item) => item.id == category)?.data || [];
    setTagList(radioUpdate);
  }, [category]);
  const onRefresh = () => {
    reset();
    setIsSubmit(false);
    toggleCreate(false);
    dispatch(resetHandbookForm());
  };

  const onSubmit = async (data) => {
    setIsSubmit(true);

    try {
      let submitData = data;
      submitData.student_category_id = category;
      if (thumbnail) {
        submitData.thumbnail = thumbnail
          ? await uploadImageToStorage(thumbnail, "thumbnail", HANDBOOK_FOLDER)
          : null;
      }
      const response = await createNewHandbook(submitData);
      if (response) {
        showToastMessage("Tạo thành thành công", "success");
        dispatch(setNewHandbook(response.data.data));
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
          ? await uploadImageToStorage(thumbnail, "thumbnail", HANDBOOK_FOLDER)
          : null;
      }

      const response = await updateHandbook(submitData);
      if (response) {
        showToastMessage("Cập nhật thành thành công", "success");
        dispatch(
          updateHandbookById({
            id: handbookDetail?.id,
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
    if (handbookDetail?.id) {
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
                {handbookDetail?.id ? "Cập nhật" : "Tạo"}
              </button>
            </div>
          </header>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <label>
                Hình ảnh <span className="my-2 text-red-500">*</span>
              </label>
              <InputUploadSquare
                fileUrl={handbookDetail?.thumbnail}
                setImg={setThumbnail}
              />
            </Grid>
            <Grid item xs={12}>
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
              <InputSelect
                value={handbookDetail?.school_id}
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
                label="Đường dẫn"
                required={false}
                id="link"
                type="text"
                inputCS={inputCs}
                name="link"
                register={register("link")}
                // helperText={errors.link ? errors.link.message : ""}
              />
              {/* <InputField
                variant="auth"
                extra="mb-3"
                label="Tags"
                required={false}
                id="tags"
                type="text"
                inputCS={inputCs}
                name="tags"
                register={register("tags")}
                // helperText={errors.tags ? errors.tags.message : ""}
              /> */}
              <InputSelect
                value={handbookDetail?.tags}
                data={tagList || []}
                variant="auth"
                extra="mb-3"
                label="Tags"
                required={true}
                id="tags"
                inputCS={inputCs}
                name="tags"
                register={register("tags")}
                // helperText={errors.tags ? errors.tags.message : ""}
              />
              
              <QuillEditor
                label="Mô tả"
                required={true}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                name="description"
                value={handbookDetail?.description}
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
            {handbookDetail?.id ? "Cập nhật" : "Tạo"}
          </button>
        </Box>
      </form>
    </div>
  );
};

export default CreateNewStudentHandbook;
