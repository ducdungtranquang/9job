import { yupResolver as FormResolver } from "@hookform/resolvers/yup";
import { Add, Delete } from "@mui/icons-material";
import { Box, Button, Checkbox, CircularProgress, Grid } from "@mui/material";
import Card from "components/card";
import InputField from "components/fields/InputField";
import InputFieldMix from "components/fields/InputFieldMix";
import InputRadio from "components/fields/InputRadio";
import InputUploadSquare from "components/fields/InputUploadSquare";
import TextField from "components/fields/TextField";
import QuillEditor from "components/reactDraftEditor";
import TitleMd from "components/shares/TitleMd";
import {
  CLUB_CATEGORY,
  COMPETITION_CATEGORY,
  EVENT_CATEGORY,
  JOB_EVALUATION_CATEGORY,
  PROJECT_CATEGORY,
  SCHOOLARSHIP_CATEGORY,
  YOURSELF_EVALUATION_CATEGORY,
} from "constants/CategoryConstant";
import { ACTIVITIES_FOLDER } from "constants/FileNameConstant";
import { priorityConstant } from "constants/SelectConstant";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createActivities, updateActivities } from "services/activity.service";
import {
  addMoreCard,
  decreaseCard,
  resetActivityForm,
  setCardChange,
  setNewActivity,
  updateActivityById,
} from "store/activityReducer";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";
import { ActivitySchema } from "utils";
import { mappingData, uploadImageToStorage } from "utils/helpers";
import FilterClub from "./FilterClub";
import FilterCompetition from "./FilterCompetition";
import FilterEvaluationJob from "./FilterEvaluationJob";
import FilterEvaluationYourself from "./FilterEvaluationYourself";
import FilterEvent from "./FilterEvent";
import FilterProject from "./FilterProject";
import FilterScholarship from "./FilterScholarship";

const inputCs = "border border-solid border-brand-500 z-50";

const ActivityForm = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const { activityDetail, activityCards } = useSelector(
    (state) => state.activities
  );

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...activityDetail,
      button_label: "Truy cập",
    },
    mode: "onBlur",
    resolver: FormResolver(ActivitySchema()),
  });

  const onRefresh = () => {
    reset();
    dispatch(resetActivityForm());
    setIsSubmit(false);
    toggleCreate();
  };

  const handleSendData = async (data) => {
    if (activityDetail?.id) {
      await onUpdate(data);
    } else {
      await onSubmit(data);
    }
  };
  const onSubmit = async (data) => {
    try {
      let submitData = data;
      submitData.activity_category_id = category;
      if (showCard) {
        submitData.cards = mappingData(activityCards);
      }
      if (!thumbnail) {
        showToastMessage("Bạn cần phải tải ảnh", "error");
        return;
      }
      if (!showCard) {
        delete submitData.cards;
      }
      // setIsSubmit(true);
      submitData.thumbnail = thumbnail
        ? await uploadImageToStorage(thumbnail, "thumbnail", ACTIVITIES_FOLDER)
        : null;
      const response = await createActivities(submitData);

      if (response.status === 200) {
        dispatch(setNewActivity(response?.data?.data));
        showToastMessage("Tạo thành thành công", "success");
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
      submitData.activity_category_id = category;
      submitData.cards = mappingData(activityCards);
      if (
        submitData.cards[0].name === "" &&
        submitData.cards[0].description === "" &&
        submitData.cards[0].thumbnail === ""
      ) {
        delete submitData.cards;
      }
      submitData.thumbnail = thumbnail
        ? await uploadImageToStorage(thumbnail, "thumbnail", ACTIVITIES_FOLDER)
        : activityDetail?.thumbnail;

      const response = await updateActivities(submitData);

      if (response) {
        showToastMessage("Cập nhật thành thành công", "success");
        dispatch(
          updateActivityById({
            id: activityDetail?.id,
            data: response?.data?.data,
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
  function showToastMessage(msg, servity) {
    dispatch(setIsToastMessageShow());
    dispatch(
      setMessage({
        message: msg,
        severity: servity,
      })
    );
  }
  // handle course doc change to store
  const handleCardChange = async (e, id, isFile) => {
    if (e) {
      if (!isFile || isFile === undefined) {
        dispatch(setCardChange({ id, value: e.target.value }));
      }
      if (isFile) {
        dispatch(setCardChange({ id, value: e }));
      }
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
                {activityDetail?.id ? "Cập nhật" : "Tạo"}
              </button>
            </div>
          </header>
          <TitleMd title="Thông tin chung" />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InputUploadSquare
                fileUrl={activityDetail?.thumbnail}
                setImg={setThumbnail}
                helperText={errors.thumbnail ? errors.thumbnail.message : ""}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                variant="auth"
                extra="mb-3"
                label="Tên hoạt động"
                placeholder="Nhập tên hoạt động"
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
                defaultValue={activityDetail?.active || 1}
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
                helperText={
                  errors.certificate ? errors.certificate.message : ""
                }
              />
              <InputRadio
                variant="auth"
                extra="mb-3"
                label="Hiện thị"
                id="priority"
                type="text"
                inputCS={inputCs}
                name="priority"
                defaultValue={activityDetail?.priority || 0}
                register={register("priority")}
                item={priorityConstant}

              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                variant="auth"
                extra="mb-3"
                label="Mô tả ngắn gọn"
                required={true}
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
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                variant="auth"
                extra="mb-3"
                label="Chữ trên nút"
                placeholder="Nhập chữ trên nút"
                required={false}
                id="button_label"
                type="text"
                inputCS={inputCs}
                name="button_label"
                register={register("button_label")}
                helperText={
                  errors.button_label ? errors.button_label.message : ""
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputField
                variant="auth"
                extra="mb-3"
                label="Đường dẫn"
                placeholder="Nhập đường dẫn"
                required={true}
                id="link"
                type="text"
                inputCS={inputCs}
                name="link"
                register={register("link")}
                helperText={errors.link ? errors.link.message : ""}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <QuillEditor
                label="Mô tả"
                required={true}
                helperText={
                  errors.long_description ? errors.long_description.message : ""
                }
                name="long_description"
                value={activityDetail?.long_description}
                setValue={setValue}
                register={register("long_description")}
              />
            </Grid>
          </Grid>
        </Card>

        <Card extra={"w-full h-full px-6 py-5 my-5"}>
          <Box className="flex items-start justify-between">
            {" "}
            <Box className="w-[90%]">
              {" "}
              <TitleMd
                title={
                  <p>
                    Card (Khu vực sẽ nằm ở cuối trang web, cho những nội dung
                    nổi bật.{" "}
                    <span className="text-green-500">Tích chọn để mở card</span>
                    )
                  </p>
                }
              />
            </Box>
            <Checkbox onChange={(e) => setShowCard(e.target.checked)} />
          </Box>
          {showCard && (
            <Grid container spacing={3}>
              <Grid item xs={12} className="flex justify-end">
                <Button
                  className="text-gray-500"
                  onClick={() => dispatch(addMoreCard())}
                >
                  <Add />
                  Thêm
                </Button>
              </Grid>
              {activityCards?.map((item, index) => (
                <Fragment key={index}>
                  <Grid item xs={12} md={item?.col || 12}>
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
                      fileUrl={item?.value}
                      handleChange={handleCardChange}
                    />
                  </Grid>
                  {(index + 1) % 5 === 0 &&
                    index !== activityCards?.length - 1 && (
                      <Grid
                        item
                        xs={12}
                        key={`divider-${index}`}
                        className="flex justify-between"
                      >
                        <TitleMd
                          textColor="text-red-500"
                          title={`Nội dung card:  ${item.groupId}`}
                        />
                        <Button
                          sx={{ color: "red" }}
                          onClick={() => dispatch(decreaseCard(item.groupId))}
                        >
                          <Delete sx={{ color: "red" }} />
                          Xoá
                        </Button>
                      </Grid>
                    )}
                </Fragment>
              ))}
            </Grid>
          )}
        </Card>

        <Card extra={"w-full h-full px-6 py-5 my-5"}>
          <Box>
            {category === CLUB_CATEGORY && (
              <>
                <TitleMd title="Dành cho filter (bạn nên điền đủ các trường bên dưới để tìm kiếm sau này)" />
                <FilterClub
                  data={activityDetail}
                  inputCS={inputCs}
                  register={register}
                />
              </>
            )}

            {category === PROJECT_CATEGORY && (
              <>
                <TitleMd title="Dành cho filter (bạn nên điền đủ các trường bên dưới để tìm kiếm sau này)" />

                <FilterProject
                  data={activityDetail}
                  inputCS={inputCs}
                  register={register}
                />
              </>
            )}

            {category === COMPETITION_CATEGORY && (
              <>
                <TitleMd title="Dành cho filter (bạn nên điền đủ các trường bên dưới để tìm kiếm sau này)" />
                <FilterCompetition
                  data={activityDetail}
                  inputCS={inputCs}
                  register={register}
                />
              </>
            )}

            {category === SCHOOLARSHIP_CATEGORY && (
              <>
                <TitleMd title="Dành cho filter (bạn nên điền đủ các trường bên dưới để tìm kiếm sau này)" />
                <FilterScholarship
                  data={activityDetail}
                  inputCS={inputCs}
                  register={register}
                />
              </>
            )}

            {category === EVENT_CATEGORY && (
              <>
                <TitleMd title="Dành cho filter (bạn nên điền đủ các trường bên dưới để tìm kiếm sau này)" />
                <FilterEvent
                  data={activityDetail}
                  inputCS={inputCs}
                  register={register}
                />
              </>
            )}

            {category === YOURSELF_EVALUATION_CATEGORY && (
              <>
                <TitleMd title="Thông tin được hiện bên ngoài card, vui lòng cung cấp đầy đủ" />

                <FilterEvaluationYourself
                  data={activityDetail}
                  inputCS={inputCs}
                  register={register}
                />
              </>
            )}

            {category === JOB_EVALUATION_CATEGORY && (
              <>
                <TitleMd title="Thông tin được hiện bên ngoài card, vui lòng cung cấp đầy đủ" />

                <FilterEvaluationJob
                  data={activityDetail}
                  inputCS={inputCs}
                  register={register}
                />
              </>
            )}
          </Box>
        </Card>

        <Box className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-brand-500 px-5 py-2 normal-case text-white dark:bg-white dark:text-navy-700"
          >
            {activityDetail?.id ? "Cập nhật" : "Tạo"}
          </button>
        </Box>
      </form>
    </div>
  );
};

export default ActivityForm;
