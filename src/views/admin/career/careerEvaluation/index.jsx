/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { JOB_EVALUATION_CATEGORY } from "constants/CategoryConstant";
import { useState } from "react";
import ActivityForm from "views/admin/activities/components/ActivityForm";
import ActivityTable from "views/admin/activities/components/ActivityTable";

const CareerEvaluationPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <ActivityTable
            category={JOB_EVALUATION_CATEGORY}
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <ActivityForm
          toggleCreate={toggleCreate}
          category={JOB_EVALUATION_CATEGORY}
        />
      )}
    </>
  );
};

export default CareerEvaluationPage;
