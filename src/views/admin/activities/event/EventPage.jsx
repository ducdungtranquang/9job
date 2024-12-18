import { ModalsProvider } from "@mantine/modals";
import { EVENT_CATEGORY } from "constants/CategoryConstant";
import { useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityTable from "../components/ActivityTable";

const EventPage = () => {
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
            category={EVENT_CATEGORY}
          />
        </ModalsProvider>
      ) : (
        <ActivityForm toggleCreate={toggleCreate} category={EVENT_CATEGORY} />
      )}
    </>
  );
};

export default EventPage;
