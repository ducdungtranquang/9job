/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import CareerDocumentTable from "./CareerDocumentTable";
import CreateDocumentForm from "./CreateDocumentForm";

const CareerDocumentPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <CareerDocumentTable
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateDocumentForm
          toggleCreate={toggleCreate}
        />
      )}
    </>
  );
};

export default CareerDocumentPage;
