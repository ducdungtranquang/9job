import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import CoinRefundForPartnerTable from "./CoinRefundForPartnerTable";

const CoinRefundForPartnerList = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <>
      <ModalsProvider>
        <CoinRefundForPartnerTable toggleCreate={toggleCreate} />
      </ModalsProvider>
    </>
  );
};

export default CoinRefundForPartnerList;
