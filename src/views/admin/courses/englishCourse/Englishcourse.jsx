/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { ENGLISH_CAT } from "constants/CategoryConstant";
import { useState } from "react";
import CourseTableCommon from "../components/CourseTable";
import CreateNewCourse from "../components/CreateNewCourse";

const Englishcourse = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <CourseTableCommon
            category={ENGLISH_CAT}
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateNewCourse toggleCreate={toggleCreate} category={ENGLISH_CAT} />
      )}
    </>
  );
};

export default Englishcourse;

