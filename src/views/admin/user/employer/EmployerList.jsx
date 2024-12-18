import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import EmployerTable from "./EmployerTable";

const EmployerList = () => {
    const [isCreate, setIsCreate] = useState(false);
  
    const toggleCreate = () => {
      setIsCreate(!isCreate);
    };
    return (
      <>
        <ModalsProvider>
          <EmployerTable toggleCreate={toggleCreate} />
        </ModalsProvider>
      </>
    );
  };
  
  export default EmployerList;