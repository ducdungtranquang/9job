// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import DataTables from "views/admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  FaAdversal,
  FaAward,
  FaChalkboardTeacher,
  FaHandshake,
  FaImage,
  FaProjectDiagram,
  FaRoute,
  FaUniversity,
} from "react-icons/fa";
import { IoDocumentSharp, IoNewspaper } from "react-icons/io5";
import {
  MdAdminPanelSettings,
  MdBarChart,
  MdBookmark,
  MdEmojiEvents,
  MdEvent,
  MdHome,
  MdHomeWork,
  MdLock,
  MdOutlineShoppingCart,
  MdPerson,
  MdRateReview,
} from "react-icons/md";
import { Mentee, Mentor } from "views/admin";

import { Group, Person, Star } from "@mui/icons-material";
import { HiUser } from "react-icons/hi";
import ClubList from "views/admin/activities/club/ClubList";
import CompetitionPage from "views/admin/activities/competition/CompetitionPage";
import EventPage from "views/admin/activities/event/EventPage";
import ProjectPage from "views/admin/activities/project/ProjectPage";
import ScholarshipPage from "views/admin/activities/scholarship/ScholarshipPage";
import BannerPage from "views/admin/advertise/banners/BannerPage";
import AdsCompanyPage from "views/admin/advertise/companies/AdsCompanyPage";
import BannerWebPage from "views/admin/banners_website/BannerWebPage";
import CareerDocumentPage from "views/admin/career/careerDocument";
import CareerEvaluationPage from "views/admin/career/careerEvaluation";
import CareerRoutePage from "views/admin/career/careerRoute";
import YourselfEvaluationPage from "views/admin/career/yourselfEvaluation";
import Fanpage from "views/admin/categories/fanpage/FanPage";
import PartnerPage from "views/admin/categories/partners/PartnerPage";
import UniversityPage from "views/admin/categories/universities/UniversityPage";
import ContactPage from "views/admin/contact";
import Advancourse from "views/admin/courses/advanceCourse/Advancourse";
import Chinesecourse from "views/admin/courses/chineseCouse/Chinesecourse";
import Englishcourse from "views/admin/courses/englishCourse/Englishcourse";
import ITcourse from "views/admin/courses/itCourse/ITcourse";
import ReviewExamcourse from "views/admin/courses/reviewExamCourse/ReviewExamcourse";
import SoftSkillcourse from "views/admin/courses/softSkillCourse/SoftSkillcourse";
import StudentDocument from "views/admin/handbook/documents/ReviewSchool";
import NotificationAdmissionPage from "views/admin/handbook/notification/NotificationAdmissionPage";
import NotificationOutputPage from "views/admin/handbook/notification/NotificationOutputPage";
import RevviewSchool from "views/admin/handbook/reviewSchool/ReviewSchool";
import CvList from "views/admin/jobs/CvList";
import JobLists from "views/admin/jobs/JobList";
import RatingPage from "views/admin/mentor/ratings/RatingPage";
import NewsReviewPage from "views/admin/reviews/newsReview/NewsReviewPage";
import UserReviewPage from "views/admin/reviews/userReview/UserReviewPage";
import CoinRefundForPartnerList from "views/admin/transactions/coinRefundForPartner/coinRefundOfEachUser/CoinRefundForPartnerList";
import TotalCoinRefundForEachPartnerList from "views/admin/transactions/coinRefundForPartner/totalCoinRefundForEachPartner/TotalCoinRefundForEachPartnerList";
import TransactionList from "views/admin/transactions/coinTransactions/TransactionList";
import CoursePurchaseList from "views/admin/transactions/coursePurchase/CoursePurchaseList";
import TransferInfoList from "views/admin/transactions/transferInfo/TransferInfoList";
import UserList from "views/admin/user/UserList";
import AdminList from "views/admin/user/admin/AdminList";
import EmployerList from "views/admin/user/employer/EmployerList";
import InstructorPage from "views/admin/user/instructor/InstructorPage";

const routes = [
  {
    name: "Tổng quan",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  // {
  //   name: "Demo",
  //   layout: "/admin",
  //   path: "demo",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <DemoPlayGorund />,
  // },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "nft-marketplace",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  // {
  //   name: "Tài khoản",
  //   layout: "/admin",
  //   path: "tai-khoan",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: undefined,
  // },
  // cẩm  nang sinh viên
  {
    name: "Review về trường",
    layout: "/admin",
    path: "cam-nang-sinh-vien/review-ve-truong",
    component: <RevviewSchool />,
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: "Tài liệu học tập",
    layout: "/admin",
    path: "cam-nang-sinh-vien/tai-lieu-hoc-tap",
    icon: <MdPerson className="h-6 w-6" />,
    component: <StudentDocument />,
  },
  {
    name: "Thông báo chuẩn đầu ra",
    layout: "/admin",
    path: "cam-nang-sinh-vien/thong-bao-chuan-dau-ra",
    icon: <MdPerson className="h-6 w-6" />,
    component: <NotificationOutputPage />,
  },
  {
    name: "Thông báo tuyển sinh",
    layout: "/admin",
    path: "cam-nang-sinh-vien/thong-bao-tuyen-sinh",
    icon: <MdPerson className="h-6 w-6" />,
    component: <NotificationAdmissionPage />,
  },
  {
    name: "Người dùng",
    layout: "/admin",
    path: "nguoi-dung/danh-sach-nguoi-dung",
    icon: <MdPerson className="h-6 w-6" />,
    component: <UserList />,
  },
  {
    name: "Danh sách nhà tuyển dụng",
    layout: "/admin",
    path: "nguoi-dung/danh-sach-nha-tuyen-dung",
    icon: <MdHomeWork className="h-5 w-5" />,
    component: <EmployerList />,
  },
  {
    name: "Danh sách admin",
    layout: "/admin",
    path: "nguoi-dung/danh-sach-admin",
    icon: <MdAdminPanelSettings className="h-5 w-5" />,
    component: <AdminList />,
  },
  {
    name: "Danh sách giảng viên",
    layout: "/admin",
    path: "nguoi-dung/giang-vien",
    icon: <FaChalkboardTeacher className="h-5 w-5" />,
    component: <InstructorPage />,
  },
  // Jobs
  {
    name: "Danh sách công việc",
    layout: "/admin",
    path: "cong-viec/danh-sach-cong-viec",
    icon: <MdPerson className="h-6 w-6" />,
    component: <JobLists />,
  },
  {
    name: "Danh sách CV",
    layout: "/admin",
    path: "cong-viec/danh-sach-cv",
    icon: <MdPerson className="h-6 w-6" />,
    component: <CvList />,
  },
  // Transactions
  {
    name: "Danh sách giao dịch",
    layout: "/admin",
    path: "giao-dich/danh-sach-giao-dich",
    icon: <MdPerson className="h-6 w-6" />,
    component: <TransactionList />,
  },

  {
    name: "Danh sách khóa học đã đăng ký",
    layout: "/admin",
    path: "giao-dich/danh-sach-khoa-da-dang-ky",
    icon: <MdPerson className="h-6 w-6" />,
    component: <CoursePurchaseList />,
  },
  {
    name: "Danh sách Thông tin chuyển khoảng",
    layout: "/admin",
    path: "giao-dich/danh-sach-tai-khoan-ngan-hang",
    icon: <MdPerson className="h-6 w-6" />,
    component: <TransferInfoList />,
  },
  {
    name: "Danh sách chi tiêu xu",
    layout: "/admin",
    path: "giao-dich/danh-sach-chi-tieu",
    icon: <MdPerson className="h-6 w-6" />,
    component: <CoinRefundForPartnerList />,
  },
  {
    name: "Danh sách hoàn xu cho đối tác",
    layout: "/admin",
    path: "giao-dich/danh-sach-hoan-xu",
    icon: <MdPerson className="h-6 w-6" />,
    component: <TotalCoinRefundForEachPartnerList />,
  },
  // Activities
  {
    name: "Câu lạc bộ",
    layout: "/admin",
    path: "hoat-dong/cau-lac-bo",
    icon: <Group className="h-5 w-5" />,
    component: <ClubList />,
  },
  {
    name: "Cuộc thi",
    layout: "/admin",
    path: "hoat-dong/cuoc-thi",
    icon: <MdEmojiEvents className="h-5 w-5" />,
    component: <CompetitionPage />,
  },
  {
    name: "Dự án",
    layout: "/admin",
    path: "hoat-dong/du-an",
    icon: <FaProjectDiagram className="h-5 w-5" />,
    component: <ProjectPage />,
  },
  {
    name: "Sự kiện",
    layout: "/admin",
    path: "hoat-dong/su-kien",
    icon: <MdEvent className="h-5 w-5" />,
    component: <EventPage />,
  },
  {
    name: "Học bổng",
    layout: "/admin",
    path: "hoat-dong/hoc-bong",
    icon: <FaAward className="h-5 w-5" />,
    component: <ScholarshipPage />,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },
  {
    name: "Kỹ năng chuyên môn",
    layout: "/admin",
    path: "khoa-hoc/ky-nang-chuyen-mon",
    icon: <MdBookmark className="h-5 w-5" />,
    component: <Advancourse />,
  },
  {
    name: "Kỹ năng mềm",
    layout: "/admin",
    path: "khoa-hoc/ky-nang-mem",
    icon: <MdBookmark className="h-5 w-5" />,
    component: <SoftSkillcourse />,
  },
  {
    name: "Ôn thi học kỳ",
    layout: "/admin",
    path: "khoa-hoc/on-thi-hoc-ky",
    icon: <MdBookmark className="h-5 w-5" />,
    component: <ReviewExamcourse />,
  },
  {
    name: "Tin học",
    layout: "/admin",
    path: "khoa-hoc/tin-hoc",
    icon: <MdBookmark className="h-5 w-5" />,
    component: <ITcourse />,
  },
  {
    name: "Tiếng Anh",
    layout: "/admin",
    path: "khoa-hoc/tieng-anh",
    icon: <MdBookmark className="h-5 w-5" />,
    component: <Englishcourse />,
  },
  {
    name: "Tiếng Trung",
    layout: "/admin",
    path: "khoa-hoc/tieng-trung",
    icon: <MdBookmark className="h-5 w-5" />,
    component: <Chinesecourse />,
  },
  {
    name: "Mentor",
    layout: "/admin",
    path: "mentor/danh-sach",
    icon: <MdBookmark className="h-5 w-5" />,
    component: <Mentor />,
  },
  {
    name: "Đánh giá",
    layout: "/admin",
    path: "mentor/danh-gia",
    icon: <Star className="h-5 w-5" />,
    component: <RatingPage />,

  },
  {
    name: "Mentee",
    layout: "/admin",
    path: "mentee/danh-sach",
    icon: <MdBookmark className="h-5 w-5" />,
    component: <Mentee />,
  },
  {
    name: "Liên hệ",
    layout: "/admin",
    path: "lien-he",
    icon: <MdBookmark className="h-5 w-5" />,
    component: <ContactPage />,
  },
  {
    name: "Lộ trình sự nghiệp",
    layout: "/admin",
    path: "cam-nang-nghe-nghiep/lo-trinh-su-nghiep",
    icon: <FaRoute className="h-5 w-5" />,
    component: <CareerRoutePage />,
  },
  {
    name: "Đánh giá thấu hiểu bản thân",
    layout: "/admin",
    path: "cam-nang-nghe-nghiep/danh-gia-thau-hieu-ban-than",
    icon: <MdRateReview className="h-5 w-5" />,
    component: <YourselfEvaluationPage />,
  },
  {
    name: "Đánh giá công việc phù hợp",
    layout: "/admin",
    path: "cam-nang-nghe-nghiep/danh-gia-cong-viec-phu-hop",
    icon: <MdRateReview className="h-5 w-5" />,
    component: <CareerEvaluationPage />,
  },
  {
    name: "Tài liệu công việc",
    layout: "/admin",
    path: "cam-nang-nghe-nghiep/tai-lieu",
    icon: <IoDocumentSharp className="h-5 w-5" />,
    component: <CareerDocumentPage />,
  },
  {
    name: "Banner",
    layout: "/admin",
    path: "banners/ads",
    icon: <FaAdversal className="h-5 w-5" />,
    component: <BannerPage />,
  },
  {
    name: "Company",
    layout: "/admin",
    path: "banners/companies",
    icon: <FaAdversal className="h-5 w-5" />,
    component: <AdsCompanyPage />,
  },
  {
    name: "Người dùng",
    layout: "/admin",
    path: "danh-gia/nguoi-dung",
    icon: <Person className="h-5 w-5" />,
    component: <UserReviewPage />,
  },
  {
    name: "Báo chí",
    layout: "/admin",
    path: "danh-gia/bao-chi",
    icon: <IoNewspaper className="h-5 w-5" />,
    component: <NewsReviewPage />,
  },
  {
    name: "Trường đại học",
    layout: "/admin",
    path: "danh-muc/truong-dai-hoc",
    icon: <FaUniversity className="h-5 w-5" />,
    component: <UniversityPage />,
  },
  {
    name: "Đối tác",
    layout: "/admin",
    path: "danh-muc/doi-tac",
    icon: <FaHandshake className="h-5 w-5" />,
    component: <PartnerPage />,
  },
  {
    name: "Fanpage",
    layout: "/admin",
    path: "danh-muc/fanpage",
    icon: <HiUser className="h-5 w-5" />,
    component: <Fanpage />,

  },
  {
    name: "Banner",
    layout: "/admin",
    path: "banner-website/",
    icon: <FaImage className="h-5 w-5" />,
    component: <BannerWebPage />,

  },
];
export default routes;
