
/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { IT__CAT } from "constants/CategoryConstant";
import { useState } from "react";
import CourseTableCommon from "../components/CourseTable";
import CreateNewCourse from "../components/CreateNewCourse";

const ITcourse = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <CourseTableCommon category={IT__CAT} toggleCreate={toggleCreate} />
        </ModalsProvider>
      ) : (
        <CreateNewCourse toggleCreate={toggleCreate} category={IT__CAT} />
      )}
    </>
  );
};

export default ITcourse;

