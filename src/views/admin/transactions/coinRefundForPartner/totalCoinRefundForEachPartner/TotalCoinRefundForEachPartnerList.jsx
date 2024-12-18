import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import TotalCoinRefundForEachPartnerTable from "./TotalCoinRefundForEachPartnerTable";

const TotalCoinRefundForEachPartnerList = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      <ModalsProvider>
        <TotalCoinRefundForEachPartnerTable toggleCreate={toggleCreate} />
      </ModalsProvider>
    </>
  );
};

export default TotalCoinRefundForEachPartnerList;
