import { ModalsProvider } from "@mantine/modals";
import { CLUB_CATEGORY } from "constants/CategoryConstant";
import { useState } from "react";
import ActivityForm from "../components/ActivityForm";
import ActivityTable from "../components/ActivityTable";

const ClubList = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      {!isCreate ? (
        <ModalsProvider withGlobalStyles withNormalizeCSS>
          <ActivityTable toggleCreate={toggleCreate} category={CLUB_CATEGORY} />
        </ModalsProvider>
      ) : (
        <ActivityForm toggleCreate={toggleCreate} category={CLUB_CATEGORY} />
      )}
    </>
  );
};

export default ClubList;
