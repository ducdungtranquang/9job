import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import AdminTable from "./AdminTable";

const AdminList = () => {
    const [isCreate, setIsCreate] = useState(false);
  
    const toggleCreate = () => {
      setIsCreate(!isCreate);
    };
    return (
      <>
        <ModalsProvider>
          <AdminTable toggleCreate={toggleCreate} />
        </ModalsProvider>
      </>
    );
  };
  
  export default AdminList;