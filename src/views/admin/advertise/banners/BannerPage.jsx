import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import BannerTable from "./components/BannerTable";
import CreateBannerForm from "./components/CreateBanner";

const BannerPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <BannerTable
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateBannerForm
          toggleCreate={toggleCreate}
        />
      )}
    </>
  );
};

export default BannerPage;
