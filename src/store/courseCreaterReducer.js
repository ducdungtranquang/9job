/* eslint-disable eqeqeq */
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  COURSE_STATUS,
  initialCourseChapter,
  initialCourseDoc,
  initialCourseHighight,
  initialCourseLesson,
  initialCourseTarget,
} from "constants/CourseConstant";
import { updateCourse } from "services/courses.service";
import { v4 as uuidv4 } from "uuid";
import { hideOverlay, showOverlay } from "./overlayLoadingReducer";

export const updatreCourseById = createAsyncThunk(
  "createCourses/update",
  async (data, { dispatch }) => {
    dispatch(showOverlay());
    try {
      const response = await updateCourse(data);
      const courseDetail = response;
      dispatch(hideOverlay());
      return courseDetail;
    } catch (error) {
      dispatch(hideOverlay());
      return false;
    }
  }
);

const initialCourse = {
  id: null,
  instructor_id: null,
  category_id: null,
  name: "",
  description: "",
  thumbnail: null,
  point_coin: 0,
  partner_link: '',
  industry: null,
  status: COURSE_STATUS.ACTIVE,
  student_numbers: 0,
  instructor_name: "",
  salary: 0,
  origin_price: 0,
  discount_price: 0,
  school_id: 0,
  priority: 0,
  course_details: {
    thumbnail: null,
    certificate: 1,
    allow_view_discussion: 1,
    is_membership: 1,
  },
  is_update_course: false
};

export const courseAdapter = createEntityAdapter();
const initialState = courseAdapter.getInitialState({
  course: initialCourse,
  courseHighlight: initialCourseHighight,
  courseDoc: initialCourseDoc,
  courseTarget: initialCourseTarget,
  courseLesson: initialCourseLesson,
});

const mappingCourseHightlight = (dataArray) => {

  let newDataArray = [];
  dataArray.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      initialCourseHighight.forEach((initData) => {
        if (initData.key == key) {
          newDataArray.push({
            ...initData,
            id: uuidv4(),
            oldId: item?.id,
            disabled: false,
            value: item[key] || initData.value,
            groupId: index + 1,
          });
        }
      });
    });
  });
  return newDataArray;
};
const mappingCourseTarget = (dataArray) => {
  let newDataArray = [];
  dataArray.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      initialCourseTarget.forEach((initData) => {
        if (initData.key == key) {
          newDataArray.push({
            ...initData,
            id: uuidv4(),
            oldId: item?.id,
            disabled: false,
            value: item[key] || initData.value,
            groupId: index + 1,
          });
        }
      });
    });
  });
  return newDataArray;
};

const mappingCourseLession = (dataArray) => {
  let newDataArray = [];
  dataArray.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      initialCourseLesson.forEach((initData) => {
        if (initData.key == key) {
          let newDoc = {
            ...initData,
            id: uuidv4(),
            oldId: item?.id,
            disabled: false,
            value: item[key] || initData.value,
            groupId: index + 1,
          };
          if (Array.isArray(item.course_chapters)) {
            newDoc.course_chapters = mappingChapter(item.course_chapters);
          }
          newDataArray.push(newDoc);
        }
      });
    });
  });
  return newDataArray;
};

const mappingChapter = (dataArray) => {
  let newDataArray = [];
  dataArray.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      initialCourseChapter.forEach((initData) => {
        if (initData.key == key) {
          newDataArray.push({
            ...initData,
            id: uuidv4(),
            oldId: item?.id,
            disabled: false,
            value: item[key] || initData.value,
            groupId: index + 1,
          });
        }
      });
    });
  });
  return newDataArray;
};

const mappingCourseDoc = (dataArray) => {
  let newDataArray = [];
  dataArray.forEach((item, index) => {
    Object.keys(item).forEach((key) => {
      initialCourseDoc.forEach((initData) => {
        if (initData.key == key) {
          let newDoc = {
            ...initData,
            id: uuidv4(),
            oldId: item?.id,
            disabled: false,
            value: item[key] || initData.value,
            groupId: index + 1,
          };
          if (key == "thumbnail" && initData.key == key) {
            newDoc.fileUrl = item[key];
            newDoc.value = undefined;
            newDoc.disabled =false;
          }
          newDataArray.push(newDoc);
        }
      });
    });
  });
  return newDataArray;
};

export const createCourseSlice = createSlice({
  name: "createCourses",
  initialState,
  reducers: {
    setNewCourse: (state, action) => {
      state.course = action.payload;
    },
    setIsUpdateCourse: (state, action) => {
      state.is_update_course = action.payload;
    },
  
    setCourseDetail: (state, action) => {
      state.course.id = action.payload?.id;
      state.course.instructor_id = action.payload?.instructor_id;
      state.course.category_id = action.payload?.category_id;
      state.course.name = action.payload?.name;
      state.course.thumbnail = action.payload?.thumbnail;
      state.course.slug = action.payload?.slug;
      state.course.description = action.payload?.description;
      state.course.point_coin = action.payload?.point_coin;
      state.course.partner_link = action.payload?.partner_link;
      state.course.student_numbers = action.payload?.student_numbers;
      state.course.salary = action.payload?.salary;
      state.course.views = action.payload?.views;
      state.course.status = action.payload?.status;
      state.course.origin_price = action.payload?.origin_price;
      state.course.discount_price = action.payload?.discount_price;
      state.course.industry = action.payload?.industry;
      state.course.school_name = action.payload?.school_name;
      state.course.school_id = action.payload?.school_id;
      state.course.created_at = action.payload?.created_at;
      state.course.updated_at = action.payload?.updated_at;
      state.course.deleted_at = action.payload?.deleted_at;
      state.course.priority = action.payload?.priority;
      state.course.creator_name = action.payload?.creator_name;
      state.course.instructor_name = action.payload?.instructor_name;
      state.course.average_rating = action.payload?.average_rating;
      state.course.creator_id = action.payload?.creator_id;
      state.course.course_details = action.payload?.course_details;

      if (
        action.payload?.course_highlight &&
        action.payload?.course_highlight.length > 0
      ) {
        state.courseHighlight = mappingCourseHightlight(
          action.payload?.course_highlight
        );
      }

      if (
        action.payload?.course_documents &&
        action.payload?.course_documents.length > 0
      ) {
        state.courseDoc = mappingCourseDoc(action.payload?.course_documents);
      }

      if (
        action.payload?.course_targets &&
        action.payload?.course_targets.length > 0
      ) {
        state.courseTarget = mappingCourseTarget(
          action.payload?.course_targets
        );
      }

      if (
        action.payload?.course_lessons &&
        action.payload?.course_lessons.length > 0
      ) {
        state.courseLesson = mappingCourseLession(
          action.payload?.course_lessons
        );
      }
    },
    addMoreCourseHightlight: (state, action) => {
      const maxGroupId = state.courseHighlight.reduce(
        (max, item) => Math.max(max, item.groupId),
        0
      );
      // Increment the maxGroupId for each new group
      const newGroupId = maxGroupId + 1;
      const newEntries = initialCourseHighight.map((item) => {
        const newItem = {
          ...item,
          id: uuidv4(),
          groupId: newGroupId, // Use the newGroupId for each new group
        };
        return newItem;
      });
      state.courseHighlight.push(...newEntries);
    },
    decreaseCourseHightlight: (state, action) => {
      const id = action.payload;

      state.courseHighlight = state.courseHighlight.filter(
        (item) => item.groupId !== id
      );
    },
    setCourseHightlightChange: (state, action) => {
      const { id, value } = action.payload;

      const index = state.courseHighlight.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.courseHighlight[index].value = value;
      }
    },
    resetCourseHighlight: (state) => {
      state.courseHighlight = initialCourseHighight;
    },
    resetCourse: (state) => {
      state.course = initialCourse;
    },
    addMoreCourseDoc: (state, action) => {
      const maxGroupId = state.courseDoc.reduce(
        (max, item) => Math.max(max, item.groupId),
        0
      );
      // Increment the maxGroupId for each new group
      const newGroupId = maxGroupId + 1;
      const newEntries = initialCourseDoc.map((item) => {
        const newItem = {
          ...item,
          id: uuidv4(),
          groupId: newGroupId, // Use the newGroupId for each new group
        };
        return newItem;
      });
      state.courseDoc.push(...newEntries);
    },
    decreaseCourseDoc: (state, action) => {
      const id = action.payload;

      state.courseDoc = state.courseDoc.filter((item) => item.groupId !== id);
    },
    setCourseDocChange: (state, action) => {
      const { id, value } = action.payload;

      const index = state.courseDoc.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.courseDoc[index].value = value;
      }
    },
    resetCourseDoc: (state) => {
      state.courseDoc = initialCourseDoc;
    },
    addMoreCourseTarget: (state, action) => {
      const maxGroupId = state.courseTarget.reduce(
        (max, item) => Math.max(max, item.groupId),
        0
      );
      // Increment the maxGroupId for each new group
      const newGroupId = maxGroupId + 1;
      const newEntries = initialCourseTarget.map((item) => {
        const newItem = {
          ...item,
          id: uuidv4(),
          groupId: newGroupId, // Use the newGroupId for each new group
        };
        return newItem;
      });
      state.courseTarget.push(...newEntries);
    },
    decreaseCourseTarget: (state, action) => {
      const id = action.payload;

      state.courseTarget = state.courseTarget.filter(
        (item) => item.groupId !== id
      );
    },
    setCourseTargetChange: (state, action) => {
      const { id, value } = action.payload;

      const index = state.courseTarget.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.courseTarget[index].value = value;
      }
    },
    resetCourseTarget: (state) => {
      state.courseTarget = initialCourseTarget;
    },
    addMoreCourseLesson: (state, action) => {
      const maxGroupId = state.courseLesson.reduce(
        (max, item) => Math.max(max, item.groupId),
        0
      );
      // Increment the maxGroupId for each new group
      const newGroupId = maxGroupId + 1;
      const newEntries = initialCourseLesson.map((item) => {
        const newItem = {
          ...item,
          id: uuidv4(),
          groupId: newGroupId, // Use the newGroupId for each new group
          course_chapters: item.course_chapters.map((chapter) => ({
            // Duplicate and update IDs for course_chapters
            ...chapter,
            id: uuidv4(), // Generate new ID for the chapter
          })),
        };
        return newItem;
      });
      state.courseLesson.push(...newEntries);
    },
    decreaseCourseLesson: (state, action) => {
      const id = action.payload;

      state.courseLesson = state.courseLesson.filter(
        (item) => item.groupId !== id
      );
    },
    setCourseLessonChange: (state, action) => {
      const { id, value } = action.payload;

      const index = state.courseLesson.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.courseLesson[index].value = value;
      }
    },
    resetCourseLesson: (state) => {
      state.courseLesson = initialCourseLesson;
    },
    addMoreCourseChapter: (state, action) => {
      const lessionId = action.payload;

      // Increment the maxGroupId for each new group
      const lessonIndex = state.courseLesson.findIndex(
        (item) => item.groupId === lessionId
      );
      const chapterGroupId = state.courseLesson[
        lessonIndex
      ].course_chapters.reduce((max, item) => Math.max(max, item.groupId), 0);

      const newEntries = initialCourseChapter.map((item) => {
        const newItem = {
          ...item,
          groupId: chapterGroupId + 1,
          id: uuidv4(), // Use the newGroupId for each new group
        };
        return newItem;
      });

      if (lessonIndex !== -1) {
        state.courseLesson[lessonIndex].course_chapters.push(...newEntries);
      }
    },
    decreaseCourseChapter: (state, action) => {
      const { parentId, id } = action.payload;

      const index = state.courseLesson.findIndex(
        (item) => item.id === parentId
      );
      if (index !== -1) {
        state.courseLesson[index].course_chapters = state.courseLesson[
          index
        ].course_chapters.filter((item) => item.groupId !== id);
      }
    },
    setCourseChapterChange: (state, action) => {
      const { parentId, itemId, value } = action.payload;

      const lessonIndex = state.courseLesson.findIndex((item) => item.id === parentId);
      if (lessonIndex !== -1) {
        const chapterIndex = state.courseLesson[lessonIndex].course_chapters.findIndex((item) => item.id === itemId);
        if (chapterIndex !== -1) {
          state.courseLesson[lessonIndex].course_chapters[chapterIndex].value =value;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatreCourseById.fulfilled, (state, action) => {});
  },
});

export const {
  setNewCourse,
  addMoreCourseHightlight,
  addMoreCourseDoc,
  addMoreCourseTarget,
  addMoreCourseLesson,
  addMoreCourseChapter,
  setCourseHightlightChange,
  setCourseDocChange,
  setCourseTargetChange,
  setCourseLessonChange,
  setCourseChapterChange,
  decreaseCourseHightlight,
  decreaseCourseDoc,
  decreaseCourseTarget,
  decreaseCourseLesson,
  decreaseCourseChapter,
  resetCourseHighlight,
  resetCourseDoc,
  resetCourseTarget,
  resetCourseLesson,
  resetCourse,
  setCourseDetail,
  setIsUpdateCourse
} = createCourseSlice.actions;

export default createCourseSlice.reducer;
