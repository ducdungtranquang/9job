import { ModalsProvider } from "@mantine/modals";
import { NEWS_CATEGORY } from "constants/CategoryConstant";
import { useState } from "react";
import CreateNewReview from "../components/CreateNewReview";
import ReviewTable from "../components/NewsTable";

const NewsReviewPage = () => {
  const [isCreate, setIsCreate] = useState(false);

  const toggleCreate = () => {
    setIsCreate(!isCreate);
  };

  return (
    <>
      {!isCreate ? (
        <ModalsProvider>
          <ReviewTable toggleCreate={toggleCreate} category={NEWS_CATEGORY} />
        </ModalsProvider>
      ) : (
        <CreateNewReview toggleCreate={toggleCreate} category={NEWS_CATEGORY} />
      )}
    </>
  );
};

export default NewsReviewPage;
