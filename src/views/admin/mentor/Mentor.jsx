/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import MentorTable from "./components/MentorTable";

const MentorPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      <ModalsProvider>
        <MentorTable toggleCreate={toggleCreate} />
      </ModalsProvider>
    </>
  );
};

export default MentorPage;
