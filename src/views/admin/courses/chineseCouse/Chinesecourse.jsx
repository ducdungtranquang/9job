
/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { CHINESE_CAT } from "constants/CategoryConstant";
import { useState } from "react";
import CourseTableCommon from "../components/CourseTable";
import CreateNewCourse from "../components/CreateNewCourse";

const Chinesecourse = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <CourseTableCommon
            category={CHINESE_CAT}
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateNewCourse toggleCreate={toggleCreate} category={CHINESE_CAT} />
      )}
    </>
  );
};

export default Chinesecourse;
