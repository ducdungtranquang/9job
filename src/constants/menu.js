// Icon Imports
import { Celebration, Group, Person, Preview, Star } from "@mui/icons-material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { AiFillNotification } from "react-icons/ai";
import {
  FaAdversal,
  FaAward,
  FaBook,
  FaChalkboardTeacher,
  FaHandshake,
  FaImage,
  FaProjectDiagram,
  FaRoute,
  FaUniversity,
} from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import {
  IoBook,
  IoDocumentSharp,
  IoNewspaper,
  IoSchool,
} from "react-icons/io5";
import {
  MdAdminPanelSettings,
  MdBookmark,
  MdCategory,
  MdEmojiEmotions,
  MdEvent,
  MdHome,
  MdHomeWork,
  MdMail,
  MdOutlineWork,
  MdPerson,
  MdWork,
} from "react-icons/md";
const routes = [
  {
    name: "Quản lý",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-5 w-5" />,
  },
  // {
  //   name: "demo",
  //   layout: "/admin",
  //   path: "demo",
  //   icon: <MdHome className="h-5 w-5" />,
  // },

  // {
  //   name: "Tài khoản",
  //   layout: "/admin",
  //   path: "tai-khoan",
  //   icon: <MdPerson className="h-5 w-5" />,
  // },
  {
    name: "Người dùng",
    layout: "/admin",
    path: "nguoi-dung",
    icon: <MdPerson className="h-5 w-5" />,
    subMenu: [
      {
        name: "Danh sách người dùng",
        layout: "/admin",
        path: "nguoi-dung/danh-sach-nguoi-dung",
        icon: <MdBookmark className="h-5 w-5" />,
      },
      {
        name: "Danh sách nhà tuyển dụng",
        layout: "/admin",
        path: "nguoi-dung/danh-sach-nha-tuyen-dung",
        icon: <MdHomeWork className="h-5 w-5" />,
      },
      {
        name: "Danh sách admin",
        layout: "/admin",
        path: "nguoi-dung/danh-sach-admin",
        icon: <MdAdminPanelSettings className="h-5 w-5" />,
      },
      {
        name: "Danh sách giảng viên",
        layout: "/admin",
        path: "nguoi-dung/giang-vien",
        icon: <FaChalkboardTeacher className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Cẩm nang sinh viên",
    layout: "/admin",
    path: "cam-nang-sinh-vien",
    icon: <IoBook className="h-5 w-5" />,
    subMenu: [
      {
        name: "Review về trường",
        layout: "/admin",
        path: "cam-nang-sinh-vien/review-ve-truong",
        icon: <IoSchool className="h-5 w-5" />,
      },
      {
        name: "Tài liệu học tập",
        layout: "/admin",
        path: "cam-nang-sinh-vien/tai-lieu-hoc-tap",
        icon: <IoDocumentSharp className="h-5 w-5" />,
      },
      {
        name: "Thông báo chuẩn đầu ra",
        layout: "/admin",
        path: "cam-nang-sinh-vien/thong-bao-chuan-dau-ra",
        icon: <AiFillNotification className="h-5 w-5" />,
      },
      {
        name: "Thông báo tuyển sinh",
        layout: "/admin",
        path: "cam-nang-sinh-vien/thong-bao-tuyen-sinh",
        icon: <AiFillNotification className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Cẩm nang nghề nghiệp",
    layout: "/admin",
    path: "cam-nang-nghe-nghiep",
    icon: <IoBook className="h-5 w-5" />,
    subMenu: [
      {
        name: "Lộ trình sự nghiệp",
        layout: "/admin",
        path: "cam-nang-nghe-nghiep/lo-trinh-su-nghiep",
        icon: <FaRoute className="h-5 w-5" />,
      },
      {
        name: "Đánh giá thấu hiểu bản thân",
        layout: "/admin",
        path: "cam-nang-nghe-nghiep/danh-gia-thau-hieu-ban-than",
        icon: <Preview className="h-5 w-5" />,
      },
      {
        name: "Đánh giá công việc phù hợp",
        layout: "/admin",
        path: "cam-nang-nghe-nghiep/danh-gia-cong-viec-phu-hop",
        icon: <MdWork className="h-5 w-5" />,
      },
      {
        name: "Tài liệu công việc",
        layout: "/admin",
        path: "cam-nang-nghe-nghiep/tai-lieu",
        icon: <IoDocumentSharp className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Liên hệ",
    layout: "/admin",
    path: "lien-he",
    icon: <MdMail className="h-5 w-5" />,
  },
  {
    name: "Khoá học",
    layout: "/admin",
    path: "khoa-hoc",
    icon: <FaBook className="h-5 w-5" />,
    subMenu: [
      {
        name: "Kỹ năng chuyên môn",
        layout: "/admin",
        path: "khoa-hoc/ky-nang-chuyen-mon",
        icon: <MdBookmark className="h-5 w-5" />,
      },
      {
        name: "Kỹ năng mềm",
        layout: "/admin",
        path: "khoa-hoc/ky-nang-mem",
        icon: <MdBookmark className="h-5 w-5" />,
      },
      {
        name: "Ôn thi học kỳ",
        layout: "/admin",
        path: "khoa-hoc/on-thi-hoc-ky",
        icon: <MdBookmark className="h-5 w-5" />,
      },
      {
        name: "Tin học",
        layout: "/admin",
        path: "khoa-hoc/tin-hoc",
        icon: <MdBookmark className="h-5 w-5" />,
      },
      {
        name: "Tiếng Anh",
        layout: "/admin",
        path: "khoa-hoc/tieng-anh",
        icon: <MdBookmark className="h-5 w-5" />,
      },
      {
        name: "Tiếng Trung",
        layout: "/admin",
        path: "khoa-hoc/tieng-trung",
        icon: <MdBookmark className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Giao dịch",
    layout: "/admin",
    path: "giao-dich",
    icon: <AccountBalanceIcon className="h-5 w-5" />,
    subMenu: [
      {
        name: "Danh sách giao dịch",
        layout: "/admin",
        path: "giao-dich/danh-sach-giao-dich",
        icon: <ReceiptLongIcon className="h-5 w-5" />,
      },
      {
        name: "Danh sách khóa học đã đăng ký",
        layout: "/admin",
        path: "giao-dich/danh-sach-khoa-da-dang-ky",
        icon: <ReceiptLongIcon className="h-5 w-5" />,
      },
      {
        name: "Danh sách Thông tin chuyển khoản",
        layout: "/admin",
        path: "giao-dich/danh-sach-tai-khoan-ngan-hang",
        icon: <ReceiptLongIcon className="h-5 w-5" />,
      },
      // {
      //   name: "Danh sách chi tiêu của người dùng",
      //   layout: "/admin",
      //   path: "giao-dich/danh-sach-chi-tieu",
      //   icon: <ReceiptLongIcon className="h-5 w-5" />,
      // },
      // {
      //   name: "Danh sách hoàn xu cho đối tác",
      //   layout: "/admin",
      //   path: "giao-dich/danh-sach-hoan-xu",
      //   icon: <ReceiptLongIcon className="h-5 w-5" />,
      // },
    ],
  },

  {
    name: "Hoạt động - Sự kiện",
    layout: "/admin",
    path: "hoat-dong",
    icon: <Celebration className="h-5 w-5" />,
    subMenu: [
      {
        name: "Câu lạc bộ",
        layout: "/admin",
        path: "hoat-dong/cau-lac-bo",
        icon: <Group className="h-5 w-5" />,
      },
      {
        name: "Cuộc thi",
        layout: "/admin",
        path: "hoat-dong/cuoc-thi",
        icon: <MdEmojiEmotions className="h-5 w-5" />,

      },
      {
        name: "Dự án",
        layout: "/admin",
        path: "hoat-dong/du-an",
        icon: <FaProjectDiagram className="h-5 w-5" />,

      },
      {
        name: "Sự kiện",
        layout: "/admin",
        path: "hoat-dong/su-kien",
        icon: <MdEvent className="h-5 w-5" />,

      },
      {
        name: "Học bổng",
        layout: "/admin",
        path: "hoat-dong/hoc-bong",
        icon: <FaAward className="h-5 w-5" />,

      },
    ],
  },
  {
    name: "Công việc",
    layout: "/admin",
    path: "cong-viec",
    icon: <MdOutlineWork className="h-5 w-5" />,
    subMenu: [
      {
        name: "Danh sách công việc",
        layout: "/admin",
        path: "cong-viec/danh-sach-cong-viec",
        icon: <MdBookmark className="h-5 w-5" />,
      },
      {
        name: "Danh sách CV",
        layout: "/admin",
        path: "cong-viec/danh-sach-cv",
        icon: <MdBookmark className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Mentor / Mentee",
    layout: "/admin",
    path: "mentor",
    icon: <MdPerson className="h-5 w-5" />,
    subMenu: [
      {
        name: "Mentor",
        layout: "/admin",
        path: "mentor/danh-sach",
        icon: <MdPerson className="h-5 w-5" />,
      },
      {
        name: "Đánh giá",
        layout: "/admin",
        path: "mentor/danh-gia",
        icon: <Star className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Quảng cáo",
    layout: "/admin",
    path: "banners",
    icon: <FaAdversal className="h-5 w-5" />,
    subMenu: [
      {
        name: "Banner",
        layout: "/admin",
        path: "banners/ads",
        icon: <FaAdversal className="h-5 w-5" />,
      },
      {
        name: "Công ty",
        layout: "/admin",
        path: "banners/companies",
        icon: <FaAdversal className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Đánh giá",
    layout: "/admin",
    path: "danh-gia",
    icon: <Star className="h-5 w-5" />,
    subMenu: [
      {
        name: "Người dùng",
        layout: "/admin",
        path: "danh-gia/nguoi-dung",
        icon: <Person className="h-5 w-5" />,
      },
      {
        name: "Báo chí",
        layout: "/admin",
        path: "danh-gia/bao-chi",
        icon: <IoNewspaper className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Danh mục",
    layout: "/admin",
    path: "danh-muc",
    icon: <MdCategory className="h-5 w-5" />,
    subMenu: [
      {
        name: "Đối tác",
        layout: "/admin",
        path: "danh-muc/doi-tac",
        icon: <FaHandshake className="h-5 w-5" />,
      },
      {
        name: "Trường đại học",
        layout: "/admin",
        path: "danh-muc/truong-dai-hoc",
        icon: <FaUniversity className="h-5 w-5" />,
      },
      {
        name: "Fanpage",
        layout: "/admin",
        path: "danh-muc/fanpage",
        icon: <HiUser className="h-5 w-5" />,
      },
    ],
  },
  {
    name: "Banner website",
    layout: "/admin",
    path: "banner-website/",
    icon: <FaImage className="h-5 w-5" />,
  },
];
export default routes;
