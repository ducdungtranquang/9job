export const HOST =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_HOST_DEV
    : process.env.REACT_APP_HOST_PRODUCTION;

export const REGISTER = "/auth/register";
export const LOGIN = "/auth/login";
export const INFO_USER = "/auth/me";
export const UPLOAD_MEDIA = "media-posts/upload";

export const PREFIX_ADMIN = "/admin";
// course
export const COURSE_ADMIN = "/admin/course";
export const CREATE_ENDPOINT = "/create";
export const UPDATE_ENDPOINT = "/update";
export const DELETE_ENDPOINT = "/delete";

// users
export const USER_ADMIN = "/admin/users";
export const UPDATE_PROFILE = "/update-profile";
export const USERS = "/users";
export const INSTRUCTOR = "/instructors";
export const EXPORT_DATA = "/export-data";

// upload
export const UPLOAD_URL = "/upload";
export const IMAGE_ENDPOINT = "/image";

// dashboard
export const DASHBOARD = "/admin/dashboard";
export const USER_LOGIN_ADMIN = "/admin/dashboard/user_login";
export const USER_REGISTER_ADMIN = "/admin/dashboard/user_register";
export const USER_COIN_ADMIN = "/admin/dashboard/user_coin";
export const USER_COURSE_ADMIN = "/admin/dashboard/user_course";

// Jobs
export const JOB = "/jobs";

// Companies
export const COMPANY = "/jobs/companies/getall";
export const SET_ADS_COMPANY = "/jobs/companies/set-ads";

// Transaction
export const GETAll_TRANSACTION = "/coins/transactions";
export const GETAll_COURSEPURCHASE = "/course-purchase/getall";
export const UPDATE_COURSEPURCHASE_STATUS = "/course-purchase/status";
export const GETALL_COIN_USER_USED = "/coins/calculate-refund-amount-all";
export const GETAll_COIN_REFUND_FOR_PARTNER = "/coins/total-refund-partner";
export const GETAll_TRANSFER_INFO = "/transfer";

// Activities
export const ACTIVITY = "/activities";
export const CREATE_ACTIVITY = "/activities/create";

//admin job route

export const CVJOB_ADMIN = "/admin/cvs";
export const GETALL_JOB_CV = "/jobs/cvs/getall";

export const HANDBOOK = "/student_handbook";

// mentor
export const MENTOR_PREFIX = "/mentor";
// contact
export const SEND_MAIL_PREFIX = "/send-mail";
// universities
export const UNIVERSITY = "/universities";
export const GET_ALL = "/getAll";
// career route
export const CAREER_ROUTEMAP = "/career_roadmap";
// career document
export const CAREER_DOCUMENT = "/career_document";
// banner
export const BANNER_ENDPOINT = "/banner-ads";

export const BANNER_WEB_ENDPOINT = "/banner-website";
// review
export const REVIEWS_ENDPOINT = "/reviews";
// partners
export const PARTNERS_ENDPOINT = "/partners";
// ratings

export const MENTOR_RATING_ENDPOINT = "/ratings";
export const MENTOR_RATING_DETAIL = "/detail";

export const FANPAGE_ENDPOINT = "/fanpages";
