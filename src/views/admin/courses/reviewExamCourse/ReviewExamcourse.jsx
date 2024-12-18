/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { EXAM_REVIEW_CAT } from "constants/CategoryConstant";
import { useState } from "react";
import CourseTableCommon from "../components/CourseTable";
import CreateNewCourse from "../components/CreateNewCourse";

const ReviewExamcourse = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <CourseTableCommon
            category={EXAM_REVIEW_CAT}
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateNewCourse
          toggleCreate={toggleCreate}
          category={EXAM_REVIEW_CAT}
        />
      )}
    </>
  );
};

export default ReviewExamcourse;

