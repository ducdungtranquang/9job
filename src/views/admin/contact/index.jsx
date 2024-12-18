/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import ContactTable from "./ContactTable";

const ContactPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      <ModalsProvider>
        <ContactTable toggleCreate={toggleCreate} />
      </ModalsProvider>
    </>
  );
};

export default ContactPage;
