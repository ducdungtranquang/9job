/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { SOFT_SKILL_CAT } from "constants/CategoryConstant";
import { useState } from "react";
import CourseTableCommon from "../components/CourseTable";
import CreateNewCourse from "../components/CreateNewCourse";

const SoftSkillcourse = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <CourseTableCommon
            category={SOFT_SKILL_CAT}
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateNewCourse
          toggleCreate={toggleCreate}
          category={SOFT_SKILL_CAT}
        />
      )}
    </>
  );
};

export default SoftSkillcourse;

