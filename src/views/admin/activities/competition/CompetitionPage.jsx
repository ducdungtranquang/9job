import { ModalsProvider } from "@mantine/modals";
import { COMPETITION_CATEGORY } from "constants/CategoryConstant";
import { useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityTable from "../components/ActivityTable";

const CompetitionPage = () => {
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
            category={COMPETITION_CATEGORY}
          />
        </ModalsProvider>
      ) : (
        <ActivityForm
          toggleCreate={toggleCreate}
          category={COMPETITION_CATEGORY}
        />
      )}
    </>
  );
};

export default CompetitionPage;
