import { Box, Button, CircularProgress, Grid } from "@mui/material";
import Card from "components/card";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";

import { yupResolver as FormResolver } from "@hookform/resolvers/yup";
import { Add, Delete } from "@mui/icons-material";
import InputField from "components/fields/InputField";
import InputFieldMix from "components/fields/InputFieldMix";
import InputUpload from "components/fields/InputUpload";
import InputUploadSquare from "components/fields/InputUploadSquare";
import TextField from "components/fields/TextField";
import QuillEditor from "components/reactDraftEditor";
import TitleMd from "components/shares/TitleMd";
import { CAREER_FOLDER } from "constants/FileNameConstant";
import {
  createCareerRoute,
  updateCareerRoutemapById
} from "services/careerRoute.service";
import { setNewData } from "store/careerDocumentReducer";
import {
  addMoreRoadmap,
  decreaseRoadmap,
  resetForm,
  resetProcessDetail,
  setRoadmapChange,
  updateData
} from "store/careerRoutemapReducer";
import { routemapSchema } from "utils";
import { mappingData, uploadImageToStorage } from "utils/helpers";

const inputCs = "border border-solid border-brand-500 z-50";

const CreateCareerRoute = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { detail, processDetail } = useSelector(
    (state) => state.careerRoutemap
  );

  const [thumbnail, setThumbnail] = useState("");
  const [salaryImg, setSalaryImg] = useState("");
  const [avgSalaryImg, setAvgSalaryImg] = useState("");
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
    resolver: FormResolver(routemapSchema()),
  });

  // transform format of note and process
  useEffect(() => {
    let notes = detail?.note?.join("\n");
    let process = detail?.process?.join("\n");
    setValue("note", notes);
    setValue("process", process);
  }, [detail, setValue]);

  const onRefresh = () => {
    reset();
    setIsSubmit(false);
    toggleCreate(false);
    dispatch(resetForm());
    dispatch(resetProcessDetail());
  };

 
  const onSubmit = async (data) => {
    try {
      let submitData = data;
      submitData.note = data?.note?.split("\n") || [];
      submitData.career_roadmap_process = mappingData(processDetail);
      submitData.process = submitData.career_roadmap_process?.map(
        (item) => item.name
      );
      // get array process
      if (!thumbnail) {
        showToastMessage("Bạn phải tải ảnh", "info");
        return;
      }
      if (
        submitData.career_roadmap_process[0].name === "" ||
        submitData.career_roadmap_process[0].description === ""
      ) {
        showToastMessage("Bạn chưa nhập quá trình", "info");
        return;
      }


      setIsSubmit(true);
      if (thumbnail) {
        submitData.icon = thumbnail
          ? await uploadImageToStorage(thumbnail, "thumbnail", CAREER_FOLDER)
          : null;
      }
      if (salaryImg) {
        submitData.salary_img = salaryImg
          ? await uploadImageToStorage(salaryImg, "thumbnail", CAREER_FOLDER)
          : null;
      }
      if (avgSalaryImg) {
        submitData.avg_salary_img = avgSalaryImg
          ? await uploadImageToStorage(avgSalaryImg, "thumbnail", CAREER_FOLDER)
          : null;
      }
      const response = await createCareerRoute(submitData);
      if (response) {
        showToastMessage("Tạo thành thành công", "success");
        dispatch(setNewData(response.data));
        onRefresh();
      }
    } catch (error) {

      showToastMessage("Đã xảy ra lỗi, vui lòng kiểm tra lại", "error");
      setIsSubmit(false);
    }
  };

  const onUpdate = async (data) => {
    try {
      let submitData = data;
      submitData.note = data?.note?.split("\n");
      submitData.career_roadmap_process = mappingData(processDetail);
      submitData.process = submitData.career_roadmap_process?.map(
        (item) => item.name
      ); // get array process

      setIsSubmit(true);
      if (thumbnail) {
        submitData.icon = thumbnail
          ? await uploadImageToStorage(thumbnail, "thumbnail", CAREER_FOLDER)
          : null;
      }
      if (salaryImg) {
        submitData.salary_img = salaryImg
          ? await uploadImageToStorage(salaryImg, "thumbnail", CAREER_FOLDER)
          : null;
      }
      if (avgSalaryImg) {
        submitData.avg_salary_img = avgSalaryImg
          ? await uploadImageToStorage(avgSalaryImg, "thumbnail", CAREER_FOLDER)
          : null;
      }

      const response = await updateCareerRoutemapById(submitData);
      if (response) {
        showToastMessage("Cập nhật thành thành công", "success");
        dispatch(
          updateData({
            id: detail?.id,
            data: response.data,
          })
        );
        onRefresh();
      }
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
  // handle course target change to store
  const handleRoadmapProcessChange = (e, id) => {
    if (e && e.target && typeof e.target.value !== "undefined") {
      dispatch(setRoadmapChange({ id, value: e.target.value }));
    } else {
      dispatch(setRoadmapChange({ id, value: e }));
    }
  };
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
                    {errors.icon ? errors.icon.message : ""}
                  </span>
                )}
              </label>
              <InputUpload fileUrl={detail?.icon} setImg={setThumbnail} />
            </Grid>
            <Grid item md={12}>
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
              <label>Hình ảnh mức lương</label>
              <InputUploadSquare
                fileUrl={detail?.salary_img}
                setImg={setSalaryImg}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label>Hình ảnh mức lương trung bình</label>
              <InputUploadSquare
                fileUrl={detail?.avg_salary_img}
                setImg={setAvgSalaryImg}
              />
            </Grid>
            <Grid item xs={12} className="mb-2">
              
              <QuillEditor
                label="Mô tả"
                required={true}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                name="description"
                value={detail?.description}
                setValue={setValue}
                register={register("description")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="auth"
                extra="mb-3"
                label={
                  "Ghi chú (Bắt buộc nhấn enter xuống dòng cho mỗi ghi chú)"
                }
                required={false}
                id="note"
                type="text"
                inputCS={inputCs}
                name="note"
                register={register("note")}
                // helperText={errors.note ? errors.note.message : ""}
                rows={5}
              />
            </Grid>
          </Grid>
        </Card>

        <Card extra={"w-full h-full px-6 py-5 my-5"}>
          <Box className="flex items-center justify-between">
            {" "}
            <TitleMd title="Lộ trình" />
            <Button
              className="text-gray-500"
              onClick={() => dispatch(addMoreRoadmap())}
            >
              <Add />
              Thêm
            </Button>
          </Box>
          {processDetail?.map((item, index) => (
            <Grid container spacing={3} key={index}>
              <Fragment>
                <Grid item xs={12} md={item?.col || 12} key={index}>
                  <InputFieldMix
                    variant="auth"
                    disabled={item?.disabled}
                    label={item?.name}
                    id={item?.key}
                    type={item?.type}
                    inputCS={inputCs}
                    name={item?.key}
                    value={item?.value}
                    item={item}
                    required={item?.required}
                    handleChange={handleRoadmapProcessChange}
                  />
                </Grid>
                {/* Add a Divider or new line after every 5 items */}
                {(index + 1) % 2 === 0 &&
                  index !== processDetail?.length - 1 && (
                    <Grid
                      item
                      xs={12}
                      key={`divider-${index}`}
                      className="flex justify-between"
                    >
                      <TitleMd
                        title={`Lộ trình:  ${processDetail[index + 1].groupId}`}
                      />
                      <Button
                        sx={{ color: "red" }}
                        onClick={() =>
                          dispatch(
                            decreaseRoadmap(processDetail[index + 1].groupId)
                          )
                        }
                      >
                        <Delete sx={{ color: "red" }} />
                        Xoá
                      </Button>
                    </Grid>
                  )}
              </Fragment>
            </Grid>
          ))}
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

export default CreateCareerRoute;
