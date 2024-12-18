/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { STUDENT_CATEGOREIS } from "constants/handbook";
import { useState } from "react";
import CreateNewStudentHandbook from "../components/CreateNewStudentHandbook";
import HandBookTable from "../components/HandBookTable";

const NotificationAdmissionPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <HandBookTable
            category={STUDENT_CATEGOREIS.ADMISSION_NEWS}
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateNewStudentHandbook
          toggleCreate={toggleCreate}
          category={STUDENT_CATEGOREIS.ADMISSION_NEWS}
        />
      )}
    </>
  );
};

export default NotificationAdmissionPage;
