import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import CreateFanpageForm from "./CreateFanpage";
import FanpageTable from "./FanpageTable";

const Fanpage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <FanpageTable
            toggleCreate={toggleCreate}
          />
        </ModalsProvider>
      ) : (
        <CreateFanpageForm
          toggleCreate={toggleCreate}
        />
      )}
    </>
  );
};

export default Fanpage;
