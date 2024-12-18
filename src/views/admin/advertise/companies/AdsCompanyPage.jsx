/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import AdsCompanyTable from "./components/AdsCompanyTable";

const AdsCompanyPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      <ModalsProvider>
        <AdsCompanyTable toggleCreate={toggleCreate} />
      </ModalsProvider>
    </>
  );
};

export default AdsCompanyPage;
