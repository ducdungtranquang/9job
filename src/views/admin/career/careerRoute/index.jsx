/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import CareerRouteTable from "./CareerRouteTable";
import CreateCareerRoute from "./CreateCareerRoute";

const CareerRoutePage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <CareerRouteTable
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateCareerRoute
          toggleCreate={toggleCreate}
        />
      )}
    </>
  );
};

export default CareerRoutePage;
