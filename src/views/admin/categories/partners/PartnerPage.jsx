import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import CreatePartner from "./CreatePartner";
import PartnerTable from "./PartnerTable";

const PartnerPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <PartnerTable
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreatePartner
          toggleCreate={toggleCreate}
        />
      )}
    </>
  );
};

export default PartnerPage;
