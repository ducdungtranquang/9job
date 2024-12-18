/* eslint-disable react/jsx-pascal-case */
import { ModalsProvider } from "@mantine/modals";
import CvTable from "./components/CvTable";

const CvList = () => {

  return (
    <>
      <ModalsProvider>
        <CvTable />
      </ModalsProvider>
    </>
  );
};

export default CvList;
