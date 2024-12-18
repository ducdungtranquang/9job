import { ModalsProvider } from "@mantine/modals";
import { PROJECT_CATEGORY } from "constants/CategoryConstant";
import { useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityTable from "../components/ActivityTable";

const ProjectPage = () => {
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
            category={PROJECT_CATEGORY}
          />
        </ModalsProvider>
      ) : (
        <ActivityForm toggleCreate={toggleCreate} category={PROJECT_CATEGORY} />
      )}
    </>
  );
};

export default ProjectPage;
