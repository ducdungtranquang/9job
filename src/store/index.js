import { configureStore } from "@reduxjs/toolkit";
import activityReducer from "./activityReducer";
import bannersReducer from "./bannersReducer";
import bannersWebsiteReducer from "./bannersWebsiteReducer";
import careerDocumentReducer from "./careerDocumentReducer";
import careerRoutemapReducer from "./careerRoutemapReducer";
import companyReducer from "./companyReducer";
import contactReducer from "./contactReducer";
import createCourseReducer from "./courseCreaterReducer";
import courseReducer from "./courseReducer";
import cvJobReducer from "./cvJobReducer";
import dashboardReducer from "./dashboardReducer";
import FanpageReducer from "./FanpageReducer";
import globalReducer from "./globalReducer";
import handbookReducer from "./handbookReducer";
import instructorReducer from "./instructorReducer";
import jobReducer from "./jobReducer";
import mentorRatingReducer from "./mentorRatingReducer";
import mentorReducer from "./mentorReducer";
import overlayLoadingReducer from "./overlayLoadingReducer";
import partnersReducer from "./partnersReducer";
import reviewsReducer from "./reviewsReducer";
import transactionReducer from "./transactionReducer";
import universityReducer from "./universityReducer";
import userReducer from "./userReducer";
import userV2Reducer from "./userV2Reducer";

const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    userV2: userV2Reducer,
    courses: courseReducer,
    jobs: jobReducer,
    cvJobs: cvJobReducer,
    dashboards: dashboardReducer,
    overlay: overlayLoadingReducer,
    createCourse: createCourseReducer,
    transactions: transactionReducer,
    mentors: mentorReducer,
    contacts: contactReducer,
    handbooks: handbookReducer,
    universities: universityReducer,
    careerRoutemap: careerRoutemapReducer,
    careerDocument: careerDocumentReducer,
    activities: activityReducer,
    instructors: instructorReducer,
    banners: bannersReducer,
    companies: companyReducer,
    partners: partnersReducer,
    reviews: reviewsReducer,
    bannersWeb: bannersWebsiteReducer,
    mentorRatings: mentorRatingReducer,
    fanpages: FanpageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([]),
});

export default store;
