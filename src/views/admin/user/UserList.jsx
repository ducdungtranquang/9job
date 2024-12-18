import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import UserTable from "./UserTable";

const UserList = () => {
    const [isCreate, setIsCreate] = useState(false);
  
    const toggleCreate = () => {
      setIsCreate(!isCreate);
    };
    return (
      <>
        <ModalsProvider>
          <UserTable toggleCreate={toggleCreate} />
        </ModalsProvider>
      </>
    );
  };
  
  export default UserList;