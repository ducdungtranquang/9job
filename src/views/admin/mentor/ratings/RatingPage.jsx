import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import CreateRatings from "./CreateRatings";
import RatingTable from "./RatingTable";

const RatingPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <RatingTable
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateRatings
          toggleCreate={toggleCreate}
        />
      )}
    </>
  );
};

export default RatingPage;
