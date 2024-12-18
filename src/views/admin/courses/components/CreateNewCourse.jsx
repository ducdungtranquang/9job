/* eslint-disable react-hooks/exhaustive-deps */
import { yupResolver as FormResolver } from "@hookform/resolvers/yup";
import { Add, Delete } from "@mui/icons-material";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import Card from "components/card";
import InputField from "components/fields/InputField";
import InputSelect from "components/fields/InputSelect";
import InputUploadSquare from "components/fields/InputUploadSquare";
import TitleMd from "components/shares/TitleMd";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineArrowBack } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";

import InputFieldMix from "components/fields/InputFieldMix";
import InputRadio from "components/fields/InputRadio";

import {
  addMoreCourseChapter,
  addMoreCourseHightlight,
  addMoreCourseLesson,
  addMoreCourseTarget,
  decreaseCourseChapter,
  decreaseCourseHightlight,
  decreaseCourseLesson,
  decreaseCourseTarget,
  resetCourse,
  resetCourseDoc,
  resetCourseHighlight,
  resetCourseLesson,
  resetCourseTarget,
  setCourseChapterChange,
  setCourseDocChange,
  setCourseHightlightChange,
  setCourseLessonChange,
  setCourseTargetChange,
} from "store/courseCreaterReducer";

import QuillEditor from "components/reactDraftEditor";
import { ADVANCE_SKILL_CAT, SOFT_SKILL_CAT } from "constants/CategoryConstant";
import { COURSE_FOLDER } from "constants/FileNameConstant";
import { industryAdvanceLists, priorityConstant, softSkillLists, statusConstant } from "constants/SelectConstant";
import { createNewCourse, updateCourse } from "services/courses.service";
import { getUniversityData } from "store/universityReducer";
import { CourseSchema } from "utils";
import {
  mapCourseLesson,
  mappingData,
  uploadImageToStorage,
} from "utils/helpers";

const inputCs = "border border-solid border-brand-500 z-50";

const CreateNewCourse = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { intructorData } = useSelector((state) => state.instructors);
  const { course, courseHighlight, courseDoc, courseTarget, courseLesson } =
    useSelector((state) => state.createCourse);
  const { listUniversities } = useSelector((state) => state.universities);
  const [thumbnail, setThumbnail] = useState(null);
  const [detailThumbnail, setDetailThumbnail] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const [connectPartner, setConnectPartner] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: course,
    mode: "onBlur",
    resolver: FormResolver(CourseSchema()),
  });
  // show input
  useEffect(() => {
    if (course?.partner_link) {
      setConnectPartner(true);
    }
  }, [course]);

  const onRefresh = () => {
    reset();
    dispatch(resetCourse());
    dispatch(resetCourseHighlight());
    dispatch(resetCourseDoc());
    dispatch(resetCourseTarget());
    dispatch(resetCourseLesson());
    setIsSubmit(false);
    toggleCreate(false);
  };

  const onSubmit = async (data) => {
    try {
      let submitData = data;
      submitData.category_id = category;
      submitData.course_highlight = mappingData(courseHighlight);
      // Customer require hide this document
      // submitData.course_documents = mappingData(courseDoc);
      submitData.course_targets = mappingData(courseTarget);

      // Applying mapping to the initial data
      submitData.course_lessons = courseLesson.map(mapCourseLesson);
      if (
        submitData.course_lessons[0].name === "" ||
        submitData.course_lessons[0].course_chapters[0].name === "" ||
        (submitData.course_targets[0].name === "" &&
          submitData.course_targets[0].description === "")
      ) {
        showToastMessage("Bạn chưa nhập bài hoặc mục tiêu của khoá", "error");
        return;
      }
      setIsSubmit(true);

      submitData.thumbnail = thumbnail
        ? await uploadImageToStorage(thumbnail, "thumbnail", COURSE_FOLDER)
        : null;
      submitData.course_details.thumbnail = detailThumbnail
        ? await uploadImageToStorage(
            detailThumbnail,
            "thumbnail",
            COURSE_FOLDER
          )
        : null;
      const newCourse = await createNewCourse(submitData);

      if (newCourse) {
        showToastMessage("Tạo thành thành công", "success");
        onRefresh();
      }
    } catch (error) {
      const msg = error?.message || "Đã xảy ra lỗi, vui lòng kiểm tra lại";
      showToastMessage(msg, "error");
      setIsSubmit(false);
    }
  };

  const handleSendData = async (data) => {
    if (course?.id) {
      await onUpdate(data);
    } else {
      await onSubmit(data);
    }
  };

  const onUpdate = async (data) => {
    try {
      let submitData = data;
      setIsSubmit(true);
      submitData.thumbnail = thumbnail
        ? await uploadImageToStorage(thumbnail, "thumbnail", COURSE_FOLDER)
        : course?.thumbnail;
      submitData.course_details.thumbnail = detailThumbnail
        ? await uploadImageToStorage(
            detailThumbnail,
            "thumbnail",
            COURSE_FOLDER
          )
        : course?.course_details?.thumbnail;

      submitData.course_highlight = mappingData(courseHighlight);
      // Customer require hide this document
      // submitData.course_documents = mappingData(courseDoc);
      submitData.course_targets = mappingData(courseTarget);
      submitData.course_lessons = courseLesson.map(mapCourseLesson);
      delete submitData.coursePrviewThumnail; // prop was created in courseCreaterReducer
      delete submitData.detailCoursePrviewThumnail; // prop was created in courseCreaterReducer

      const newCourse = await updateCourse(submitData);
      // const newCourse = await Promise.resolve(true);

      if (newCourse) {
        showToastMessage("Cập nhật thành thành công", "success");
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

  // handle course hightlight change to store
  const handleCourseHightlightChange = (e, id) => {
    if (e && e.target && typeof e.target.value !== "undefined") {
      dispatch(setCourseHightlightChange({ id, value: e.target.value }));
    }
  };

  // handle course doc change to store
  const handleCourseDocChange = async (e, id, isFile) => {
    if (e) {
      if (!isFile || isFile === undefined) {
        dispatch(setCourseDocChange({ id, value: e.target.value }));
      }
      if (isFile) {
        dispatch(setCourseDocChange({ id, value: e }));
      }
    }
  };

  // handle course target change to store
  const handleCourseTargetChange = (e, id) => {
    if (e && e.target && typeof e.target.value !== "undefined") {
      dispatch(setCourseTargetChange({ id, value: e.target.value }));
    }
  };

  // handle course target change to store
  const handleCourseLessonChange = (e, id) => {
    if (e && e.target && typeof e.target.value !== "undefined") {
      dispatch(setCourseLessonChange({ id, value: e.target.value }));
    }
  };

  // handle course target change to store
  const handleCourseChapterChange = (e, itemId, parentId) => {
    if (e && e.target && typeof e.target.value !== "undefined") {
      dispatch(
        setCourseChapterChange({
          parentId,
          itemId,
          value: e.target.value,
        })
      );
    }
  };
  // get universities list
  useEffect(() => {
    dispatch(getUniversityData());
  }, [dispatch]);

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
                {course?.id ? "Cập nhật" : "Tạo"}
              </button>
            </div>
          </header>
          <TitleMd title="Thông tin chung" />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <InputUploadSquare
              fileUrl={course?.thumbnail}
              setImg={setThumbnail}
            />
            <div className="flex flex-col gap-2">
              <InputField
                variant="auth"
                extra="mb-3"
                label="Tên khoá học"
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
                defaultValue={course.status}
                register={register("status")}
                item={statusConstant}
              />
              <InputRadio
                variant="auth"
                extra="mb-3"
                label="Hiện thị"
                id="priority"
                type="text"
                inputCS={inputCs}
                name="priority"
                defaultValue={course.priority}
                register={register("priority")}
                item={priorityConstant}
              />
            </div>
            {/* <InputSelect
              value={course.category_id}
              data={CATEGORIES_DATA || []}
              variant="auth"
              extra="mb-3"
              label="Danh mục"
              required={true}
              id="category_id"
              inputCS={inputCs}
              name="category_id"
              register={register("category_id")}
              helperText={errors.category_id ? errors.category_id.message : ""}
            /> */}
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <InputSelect
              value={course?.instructor_id}
              data={intructorData || []}
              variant="auth"
              extra="mb-3"
              label="Giáo viên"
              required={true}
              id="instructor_id"
              inputCS={inputCs}
              name="instructor_id"
              register={register("instructor_id")}
              helperText={
                errors.instructor_id ? errors.instructor_id.message : ""
              }
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Xu"
              required={false}
              id="point_coin"
              type="number"
              inputCS={inputCs}
              name="point_coin"
              register={register("point_coin")}
              helperText={errors.point_coin ? errors.point_coin.message : ""}
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Số lượng học viên"
              required={true}
              id="student_numbers"
              type="number"
              inputCS={inputCs}
              name="student_numbers"
              register={register("student_numbers")}
              helperText={
                errors.student_numbers ? errors.student_numbers.message : ""
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            <InputField
              variant="auth"
              extra="mb-3"
              label="Giá gốc (VND)"
              required={true}
              id="origin_price"
              type="number"
              inputCS={inputCs}
              name="origin_price"
              register={register("origin_price")}
              helperText={
                errors.origin_price ? errors.origin_price.message : ""
              }
            />
            <InputField
              variant="auth"
              extra="mb-3"
              label="Giá khuyến mãi (VND)"
              id="discount_price"
              type="number"
              inputCS={inputCs}
              name="discount_price"
              register={register("discount_price")}
              helperText={
                errors.discount_price ? errors.discount_price.message : ""
              }
            />
            <InputSelect
              value={course?.school_id}
              data={listUniversities || []}
              variant="auth"
              extra="mb-3"
              label="Trường học"
              required={false}
              id="school_id"
              inputCS={inputCs}
              name="school_id"
              register={register("school_id")}
            />

            {category === SOFT_SKILL_CAT && (
              <InputSelect
                value={course?.skill}
                data={softSkillLists || []}
                variant="auth"
                extra="mb-3"
                label="Loại kỹ năng"
                required={false}
                id="skill"
                inputCS={inputCs}
                name="skill"
                register={register("skill")}
              />
            )}
            {category === ADVANCE_SKILL_CAT && (
              <InputSelect
                value={course?.industry}
                data={industryAdvanceLists || []}
                variant="auth"
                extra="mb-3"
                label="Ngành nghề"
                required={false}
                id="industry"
                inputCS={inputCs}
                name="industry"
                register={register("industry")}
              />
            )}
            {/* <InputSelect
              value={course?.rating}
              data={ratingByStudentLists || []}
              variant="auth"
              extra="mb-3"
              label="Đánh giá"
              required={false}
              id="rating"
              inputCS={inputCs}
              name="rating"
              register={register("rating")}
            /> */}
          </div>
          <div>
            <QuillEditor
              label="Mô tả"
              required={true}
              helperText={errors.description ? errors.description.message : ""}
              name="description"
              value={course?.description}
              setValue={setValue}
              register={register("description")}
            />
          </div>
        </Card>
        {/* khoa chi tiet */}
        <Card extra={"w-full h-full px-6 py-5 my-5"}>
          <TitleMd title="Thông tin chi tiết" />

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <InputUploadSquare
              fileUrl={course?.course_details?.thumbnail}
              setImg={setDetailThumbnail}
              label={"Tải ảnh chi tiết"}
              required={true}
            />

            <div className="flex flex-col gap-2">
              <InputRadio
                variant="auth"
                extra="mb-3"
                label="Cấp chứng nhận sau khoá học *"
                id="certificate"
                type="text"
                inputCS={inputCs}
                defaultValue={course.course_details?.certificate}
                name="course_details.certificate"
                register={register("course_details.certificate")}
                item={[
                  { label: "Có", value: 1, name: "certificate" },
                  { label: "Không", value: 0, name: "certificate" },
                ]}
                helperText={
                  errors.certificate ? errors.certificate.message : ""
                }
              />

              {/* <InputRadio
                variant="auth"
                extra="mb-3"
                label="Cho phép thảo luận *"
                id="allow_view_discussion"
                type="text"
                inputCS={inputCs}
                defaultValue={course.course_details?.allow_view_discussion}
                name="course_details.allow_view_discussion"
                register={register("course_details.allow_view_discussion")}
                item={[
                  { label: "Có", value: 1, name: "allow_view_discussion" },
                  { label: "Không", value: 0, name: "allow_view_discussion" },
                ]}
                helperText={
                  errors.allow_view_discussion
                    ? errors.allow_view_discussion.message
                    : ""
                }
              />
              <InputRadio
                variant="auth"
                extra="mb-3"
                label="Cho phép thành viên xem khóa học *"
                id="is_membership"
                type="text"
                inputCS={inputCs}
                defaultValue={course.course_details?.is_membership}
                name="course_details.is_membership"
                register={register("course_details.is_membership")}
                item={[
                  { label: "Có", value: 1, name: "is_membership" },
                  { label: "Không", value: 0, name: "is_membership" },
                ]}
                helperText={
                  errors.is_membership ? errors.is_membership.message : ""
                }
              /> */}
              <Box>
                <Box className="flex items-center gap-2">
                  <input
                    checked={connectPartner}
                    type="checkbox"
                    id="course_partner"
                    onChange={(e) => {
                      let value = e.target.checked;
                      setConnectPartner(value);
                      if (value === false) {
                        setValue("partner_link", "");
                      }
                    }}
                  />
                  <label htmlFor="course_partner" className="text-green-500">
                    Liên kết với đối tác
                  </label>
                </Box>
                {connectPartner && (
                  <InputField
                    variant="auth"
                    extra="mb-3"
                    required={true}
                    id="partner_link"
                    inputCS={inputCs}
                    name="partner_link"
                    register={register("partner_link")}
                  />
                )}
              </Box>
            </div>
          </div>
        </Card>
        {/* thong tin noi bat */}
        <Card extra={"w-full h-full px-6 py-5 my-5"}>
          <Box className="flex items-center justify-between">
            <TitleMd title="Nội dung nổi bật" />
            <Button
              className="text-gray-500"
              onClick={() => dispatch(addMoreCourseHightlight())}
            >
              <Add />
              Thêm
            </Button>
          </Box>
          <Grid container spacing={3}>
            {courseHighlight?.map((course, index) => (
              <Fragment key={index}>
                <Grid item xs={12} md={course?.col || 12}>
                  <InputFieldMix
                    variant="auth"
                    disabled={course?.disabled}
                    label={course?.name}
                    id={course?.key}
                    type={course?.type}
                    inputCS={inputCs}
                    name={course?.key}
                    value={course?.value}
                    item={course}
                    required={course?.required}
                    handleChange={handleCourseHightlightChange}
                  />
                </Grid>
                {/* Add a Divider or new line after every 5 items */}
                {(index + 1) % 2 === 0 &&
                  index !== courseHighlight?.length - 1 && (
                    <Grid
                      item
                      xs={12}
                      key={`divider-${index}`}
                      className="flex justify-between"
                    >
                      <TitleMd
                        title={`Nội dung nổi bật:  ${
                          courseHighlight[index + 1].groupId
                        }`}
                      />
                      <Button
                        sx={{ color: "red" }}
                        onClick={() =>
                          dispatch(
                            decreaseCourseHightlight(
                              courseHighlight[index + 1].groupId
                            )
                          )
                        }
                      >
                        <Delete sx={{ color: "red" }} />
                        Xoá
                      </Button>
                    </Grid>
                  )}
              </Fragment>
            ))}
          </Grid>
        </Card>

        {/* tai lieu => customer require hide*/}
        {/* <Card extra={"w-full h-full px-6 py-5 my-5"}>
          <Box className="flex items-center justify-between">
            <TitleMd title="Tài liệu" />
            <Button
              className="text-gray-500"
              onClick={() => dispatch(addMoreCourseDoc())}
            >
              <Add />
              Thêm
            </Button>
          </Box>
          <Grid container spacing={3}>
            {courseDoc?.map((course, index) => (
              <Fragment key={index}>
                <Grid item xs={12} md={course?.col || 12} key={index}>
                  <InputFieldMix
                    variant="auth"
                    disabled={course?.disabled}
                    fileUrl={course?.fileUrl}
                    label={course?.name}
                    id={course?.key}
                    type={course?.type}
                    inputCS={inputCs}
                    name={course?.key}
                    value={course?.value}
                    item={course}
                    required={course?.required}
                    handleChange={handleCourseDocChange}
                  />
                </Grid>

                {(index + 1) % 5 === 0 && index !== courseDoc?.length - 1 && (
                  <Grid
                    item
                    xs={12}
                    key={`divider-${index}`}
                    className="flex justify-between"
                  >
                    <TitleMd
                      title={`Tài liệu:  ${courseDoc[index + 1].groupId}`}
                    />
                    <Button
                      sx={{ color: "red" }}
                      onClick={() =>
                        dispatch(
                          decreaseCourseDoc(courseDoc[index + 1].groupId)
                        )
                      }
                    >
                      <Delete sx={{ color: "red" }} />
                      Xoá
                    </Button>
                  </Grid>
                )}
              </Fragment>
            ))}
          </Grid>
        </Card> */}

        {/* muc tieu*/}
        <Card extra={"w-full h-full px-6 py-5 my-5"}>
          <Box className="flex items-center justify-between">
            {" "}
            <TitleMd title="Mục tiêu của khoá" />
            <Button
              className="text-gray-500"
              onClick={() => dispatch(addMoreCourseTarget())}
            >
              <Add />
              Thêm
            </Button>
          </Box>
          <Grid container spacing={3}>
            {courseTarget?.map((course, index) => (
              <Fragment key={index}>
                <Grid item xs={12} md={course?.col || 12} key={index}>
                  <InputFieldMix
                    variant="auth"
                    disabled={course?.disabled}
                    label={course?.name}
                    id={course?.key}
                    type={course?.type}
                    inputCS={inputCs}
                    name={course?.key}
                    value={course?.value}
                    item={course}
                    required={course?.required}
                    handleChange={handleCourseTargetChange}
                  />
                </Grid>
                {/* Add a Divider or new line after every 5 items */}
                {(index + 1) % 2 === 0 &&
                  index !== courseTarget?.length - 1 && (
                    <Grid
                      item
                      xs={12}
                      key={`divider-${index}`}
                      className="flex justify-between"
                    >
                      <TitleMd
                        title={`Mục tiêu của khoá:  ${
                          courseTarget[index + 1].groupId
                        }`}
                      />
                      <Button
                        sx={{ color: "red" }}
                        onClick={() =>
                          dispatch(
                            decreaseCourseTarget(
                              courseTarget[index + 1].groupId
                            )
                          )
                        }
                      >
                        <Delete sx={{ color: "red" }} />
                        Xoá
                      </Button>
                    </Grid>
                  )}
              </Fragment>
            ))}
          </Grid>
        </Card>

        {/* bai hoc*/}
        <Card extra={"w-full h-full px-6 py-5 my-5"}>
          <Box className="flex items-center justify-between">
            {" "}
            <TitleMd title="Bài học" />
            <Button
              className="text-gray-500"
              onClick={() => {
                dispatch(addMoreCourseLesson());
              }}
            >
              <Add />
              Thêm
            </Button>
          </Box>

          {courseLesson?.map((course, index) => (
            <Grid container spacing={3} key={index} mt={1}>
              <Grid item xs={12} md={course?.col || 12}>
                {index !== 0 && (
                  <Grid
                    item
                    xs={12}
                    key={`divider-${index}`}
                    className="flex justify-between"
                  >
                    <TitleMd
                      textColor="text-red-500"
                      title={`Bài học:  ${course.groupId}`}
                    />
                    <Button
                      sx={{ color: "red" }}
                      onClick={() =>
                        dispatch(decreaseCourseLesson(course.groupId))
                      }
                    >
                      <Delete sx={{ color: "red" }} />
                      Xoá
                    </Button>
                  </Grid>
                )}
                <InputFieldMix
                  variant="auth"
                  disabled={course?.disabled}
                  label={course?.name}
                  id={course?.key}
                  type={course?.type}
                  inputCS={inputCs}
                  name={course?.key}
                  value={course?.value}
                  item={course}
                  required={course?.required}
                  handleChange={handleCourseLessonChange}
                />
                {/* Iterate over course_chapters and render content */}
              </Grid>
              <Grid item md={12}>
                <Box className="flex items-center justify-between">
                  <TitleMd title="Chương" />
                  <Button
                    className="text-gray-500"
                    onClick={() =>
                      dispatch(addMoreCourseChapter(course.groupId))
                    }
                  >
                    <Add />
                    Thêm
                  </Button>
                </Box>
                <Grid container spacing={3}>
                  {course?.course_chapters?.map((c, cI) => (
                    <Fragment key={cI}>
                      <Grid item xs={12} md={c?.col || 6}>
                        <InputFieldMix
                          variant="auth"
                          disabled={c?.disabled}
                          label={c?.name}
                          id={c?.key}
                          type={c?.type}
                          inputCS={inputCs}
                          name={c?.key}
                          value={c?.value}
                          parentId={course?.id}
                          item={c}
                          required={course?.required}
                          handleChange={handleCourseChapterChange}
                        />
                      </Grid>
                      {/* Add a Divider or new line after every 5 items */}
                      {(cI + 1) % 5 === 0 &&
                        cI !== course?.course_chapters.length - 1 && (
                          <Grid
                            item
                            xs={12}
                            key={`divider-${index}`}
                            className="flex justify-between"
                          >
                            <TitleMd title={`Chương:  ${c.groupId}`} />
                            <Button
                              sx={{ color: "red" }}
                              onClick={() =>
                                dispatch(
                                  decreaseCourseChapter({
                                    parentId: course.id,
                                    id: c.groupId + 1,
                                  })
                                )
                              }
                            >
                              <Delete sx={{ color: "red" }} />
                              Xoá
                            </Button>
                          </Grid>
                        )}
                    </Fragment>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Card>
        <Box className="flex justify-end">
          <button
            type="submit"
            className="rounded-md bg-brand-500 px-5 py-2 normal-case text-white dark:bg-white dark:text-navy-700"
          >
            {course?.id ? "Cập nhật" : "Tạo"}
          </button>
        </Box>
      </form>
    </div>
  );
};

export default CreateNewCourse;
