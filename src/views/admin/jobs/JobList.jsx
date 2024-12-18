/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import JobTable from "./components/JobTable";

const JobLists = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      <ModalsProvider>
        <JobTable toggleCreate={toggleCreate} />
      </ModalsProvider>
    </>
  );
};

export default JobLists;
