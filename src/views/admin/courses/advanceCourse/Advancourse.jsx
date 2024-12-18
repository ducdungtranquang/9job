/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { ADVANCE_SKILL_CAT } from "constants/CategoryConstant";
import { useState } from "react";
import CourseTableCommon from "../components/CourseTable";
import CreateNewCourse from "../components/CreateNewCourse";

const Advancourse = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <CourseTableCommon
            category={ADVANCE_SKILL_CAT}
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateNewCourse
          toggleCreate={toggleCreate}
          category={ADVANCE_SKILL_CAT}
        />
      )}
    </>
  );
};

export default Advancourse;
