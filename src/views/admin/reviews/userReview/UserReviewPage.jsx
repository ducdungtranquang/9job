import { ModalsProvider } from "@mantine/modals";
import { USER_CATEGORY } from "constants/CategoryConstant";
import { useState } from "react";
import CreateNewReview from "../components/CreateNewReview";
import ReviewTable from "../components/NewsTable";

const UserReviewPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <ReviewTable toggleCreate={toggleCreate} category={USER_CATEGORY} />
        </ModalsProvider>
      ) : (
        <CreateNewReview toggleCreate={toggleCreate} category={USER_CATEGORY} />
      )}
    </>
  );
};

export default UserReviewPage;
