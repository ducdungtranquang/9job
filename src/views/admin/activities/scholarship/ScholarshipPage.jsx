import { ModalsProvider } from "@mantine/modals";
import { SCHOOLARSHIP_CATEGORY } from "constants/CategoryConstant";
import { useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityTable from "../components/ActivityTable";

const ScholarshipPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      {!isCreate ? (
        <ModalsProvider withGlobalStyles withNormalizeCSS>
          <ActivityTable
            toggleCreate={toggleCreate}
            category={SCHOOLARSHIP_CATEGORY}
          />
        </ModalsProvider>
      ) : (
        <ActivityForm
          toggleCreate={toggleCreate}
          category={SCHOOLARSHIP_CATEGORY}
        />
      )}
    </>
  );
};

export default ScholarshipPage;
