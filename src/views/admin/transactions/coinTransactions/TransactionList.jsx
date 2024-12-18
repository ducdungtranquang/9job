import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import TransactionTable from "./TransactionTable";

const TransactionList = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      <ModalsProvider>
        <TransactionTable toggleCreate={toggleCreate} />
      </ModalsProvider>
    </>
  );
};

export default TransactionList;
