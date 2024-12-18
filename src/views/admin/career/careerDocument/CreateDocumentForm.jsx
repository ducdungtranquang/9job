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
import InputUploadSquare from "components/fields/InputUploadSquare";
import TextField from "components/fields/TextField";
import QuillEditor from "components/reactDraftEditor";
import { CAREER_FOLDER } from "constants/FileNameConstant";
import {
  careerLists,
  documentTypeLists,
  industryLists,
  levelLists,
} from "constants/SelectConstant";
import {
  createCareerDocument,
  updateCareerDocumentById,
} from "services/careerDocument.service";
import { resetForm, setNewData, updateData } from "store/careerDocumentReducer";
import { documentBookSchema } from "utils";
import { uploadImageToStorage } from "utils/helpers";

const inputCs = "border border-solid border-brand-500 z-50";

const CreateDocumentForm = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.careerDocument);
  const [thumbnail, setThumbnail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: detail,
    mode: "onBlur",
    resolver: FormResolver(documentBookSchema()),
  });

  const onRefresh = () => {
    reset();
    setIsSubmit(false);
    toggleCreate(false);
    dispatch(resetForm());
  };

  const onSubmit = async (data) => {
    try {
      let submitData = data;
      if (!thumbnail) {
        showToastMessage("Bạn phải tải ảnh", "info");
        return;
      }
      setIsSubmit(true);
      if (thumbnail) {
        submitData.thumbnail = thumbnail
          ? await uploadImageToStorage(thumbnail, "thumbnail", CAREER_FOLDER)
          : null;
      }
      const response = await createCareerDocument(submitData);
      if (response) {
        showToastMessage("Tạo thành thành công", "success");
        dispatch(setNewData(response.data));
        onRefresh();
      }
    } catch (error) {
      const msg = error?.response?.data;
      let msgData =
        msg &&
        Object.values(msg)
          .map((item) => item)
          .join(". ");
      showToastMessage(msgData, "error");
      setIsSubmit(false);
    }
  };

  const onUpdate = async (data) => {
    try {
      let submitData = data;
      setIsSubmit(true);
      if (thumbnail) {
        submitData.thumbnail = thumbnail
          ? await uploadImageToStorage(thumbnail, "thumbnail", CAREER_FOLDER)
          : null;
      }

      const response = await updateCareerDocumentById(submitData);
      if (response) {
        showToastMessage("Cập nhật thành thành công", "success");
        dispatch(
          updateData({
            id: detail?.id,
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
    if (detail?.id) {
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
                {detail?.id ? "Cập nhật" : "Tạo"}
              </button>
            </div>
          </header>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <label>
                Hình ảnh <span className="my-2 text-red-500">*</span>
                {errors && (
                  <span className="text-[13px] text-red-500">
                    {errors.thumbnail ? errors.thumbnail.message : ""}
                  </span>
                )}
              </label>
              <InputUploadSquare
                fileUrl={detail?.thumbnail}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <InputSelect
                value={detail?.category}
                data={documentTypeLists || []}
                variant="auth"
                extra="mb-3"
                label="Danh mục"
                required={true}
                id="category"
                inputCS={inputCs}
                name="category"
                register={register("category")}
                helperText={errors.category ? errors.category.message : ""}
              />
              <InputSelect
                value={detail?.level || []}
                data={levelLists || []}
                variant="auth"
                extra="mb-3"
                label="Trình độ"
                required={true}
                id="level"
                inputCS={inputCs}
                name="level"
                register={register("level")}
                helperText={errors.level ? errors.level.message : ""}
                multiple={true}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputSelect
                value={detail?.industry}
                data={industryLists || []}
                variant="auth"
                extra="mb-3"
                label="Lĩnh vực"
                required={true}
                id="industry"
                inputCS={inputCs}
                name="industry"
                register={register("industry")}
                helperText={errors.industry ? errors.industry.message : ""}
              />
              <InputSelect
                value={detail?.career}
                data={careerLists || []}
                variant="auth"
                extra="mb-3"
                label="Ngành nghề"
                required={true}
                id="career"
                inputCS={inputCs}
                name="career"
                register={register("career")}
                helperText={errors.career ? errors.career.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
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
                helperText={errors.link ? errors.link.message : ""}
              />
              <TextField
                variant="auth"
                extra="mb-3"
                label="Mô tả"
                required={false}
                id="description"
                type="text"
                inputCS={inputCs}
                name="description"
                register={register("description")}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                rows={5}
              />
            
              <QuillEditor
                label="Nội dung"
                required={true}
                helperText={errors.content ? errors.content.message : ""}
                name="content"
                value={detail?.content}
                setValue={setValue}
                register={register("content")}
              />
            </Grid>
          </Grid>
        </Card>
        <Box className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-brand-500 px-5 py-2 normal-case text-white dark:bg-white dark:text-navy-700"
          >
            {detail?.id ? "Cập nhật" : "Tạo"}
          </button>
        </Box>
      </form>
    </div>
  );
};

export default CreateDocumentForm;
