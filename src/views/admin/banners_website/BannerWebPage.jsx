import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import BannerWebTable from "./components/BannerWebTable";
import CreateBannerWebForm from "./components/CreateBannerWeb";

const BannerWebPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <BannerWebTable
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateBannerWebForm
          toggleCreate={toggleCreate}
        />
      )}
    </>
  );
};

export default BannerWebPage;
