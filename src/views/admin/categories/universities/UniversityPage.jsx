import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import CreateUniversity from "./CreateUniversity";
import UniversityTable from "./UniversityTable";

const UniversityPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <UniversityTable
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateUniversity
          toggleCreate={toggleCreate}
        />
      )}
    </>
  );
};

export default UniversityPage;
