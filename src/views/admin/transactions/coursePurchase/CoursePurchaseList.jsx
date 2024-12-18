import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import CoursePerchaseTable from "./CoursePurchaseTable";

const CoursePurchaseList = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      <ModalsProvider>
        <CoursePerchaseTable toggleCreate={toggleCreate} />
      </ModalsProvider>
    </>
  );
};

export default CoursePurchaseList;
