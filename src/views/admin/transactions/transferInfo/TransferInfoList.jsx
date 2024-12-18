import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import TransferInfoTable from "./TransferInfoTable";

const TransferInfoList = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      <ModalsProvider>
        <TransferInfoTable toggleCreate={toggleCreate} />
      </ModalsProvider>
    </>
  );
};

export default TransferInfoList;
