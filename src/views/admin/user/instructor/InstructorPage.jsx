import { ModalsProvider } from "@mantine/modals";
import { useState } from "react";
import CreateInstructorForm from "./CreateInstructorForm";
import InstructorTable from "./InstructorTable";

const InstructorPage = () => {
    const [isCreate, setIsCreate] = useState(false);
  
    const toggleCreate = () => {
      setIsCreate(!isCreate);
    };
    return (
      <>
        <>
          {!isCreate ? (
            <ModalsProvider>
              <InstructorTable toggleCreate={toggleCreate} />
            </ModalsProvider>
          ) : (
            <CreateInstructorForm
              toggleCreate={toggleCreate}
            />
          )}
        </>
      </>
    );
  };
  
  export default InstructorPage;