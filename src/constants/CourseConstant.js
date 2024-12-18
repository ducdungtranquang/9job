import { v4 as uuidv4 } from "uuid";
import { COURSE_FOLDER } from "./FileNameConstant";

export const COURSE_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
};

export const initialCourseHighight = [
  {
    id: uuidv4(),
    name: "Tên",
    key: "name",
    value: "",
    disabled: false,
    required: true,
    type: "text",
    groupId: 1,
    col: 12,
  },
  {
    id: uuidv4(),
    name: "Mô tả",
    key: "description",
    value: "",
    disabled: false,
    required: true,
    type: "textarea",
    groupId: 1,
    col: 12,
  },
];

export const  initialCourseDoc = [
  {
    id: uuidv4(),
    name: "Hình ảnh",
    value: "",
    key: "thumbnail",
    fileUrl: "",
    disabled: false,
    required: true,
    type: "file",
    groupId: 1,
    col: 6,
    fileName: "thumbnail",
    folderName: COURSE_FOLDER,
  },
  {
    id: uuidv4(),
    name: "Tên",
    key: "name",
    disabled: false,
    value: "",
    required: true,
    type: "text",
    groupId: 1,
    col: 6,
  },
  {
    id: uuidv4(),
    name: "Mô tả",
    value: "",
    disabled: false,
    key: "description",
    required: true,
    type: "textarea",
    groupId: 1,
    col: 12,
  },

  {
    id: uuidv4(),
    name: "Số trang",
    value: "",
    disabled: false,
    key: "page",
    required: false,
    type: "number",
    groupId: 1,
    col: 6,
  },
  {
    id: uuidv4(),
    name: "Đường dẫn tài liệu",
    value: "",
    disabled: false,
    key: "document_src",
    required: true,
    type: "text",
    groupId: 1,
    col: 6,
  },
];

export const initialCourseTarget = [
  {
    id: uuidv4(),
    name: "Tên",
    key: "name",
    value: "",
    disabled: false,
    required: true,
    type: "text",
    groupId: 1,
    col: 12,
  },
  {
    id: uuidv4(),
    name: "Mô tả",
    key: "description",
    value: "",
    disabled: false,
    required: true,
    type: "textarea",
    groupId: 1,
    col: 12,
  },
];
export const initialCourseChapter = [
  {
    id: uuidv4(),
    name: "Tên",
    value: "",
    key: "name",
    disabled: false,
    required: true,
    type: "text",
    col: 12,
    groupId: 1,
  },
  {
    id: uuidv4(),
    name: "Link youtube",
    value: "",
    key: "youtube_link",
    required: false,
    disabled: false,
    type: "text",
    col: 6,
    groupId: 1,
  },
  {
    id: uuidv4(),
    name: "Thời lượng (tính theo phút)",
    value: "",
    key: "duration",
    required: true,
    disabled: false,
    type: "number",
    col: 6,
    groupId: 1,
  },
  {
    id: uuidv4(),
    name: "Hiện thị demo",
    value: 1,
    key: "is_demo",
    required: false,
    disabled: false,
    type: "radio",
    col: 6,
    groupId: 1,
    option: [
      { id: uuidv4(), label: "Có", value: 1, name: "is_demo" },
      { id: uuidv4(), label: "Không", value: 0, name: "is_demo" },
    ],
  },
  {
    id: uuidv4(),
    name: "Trạng thái",
    value: "ACTIVE",
    disabled: false,
    key: "status",
    required: false,
    type: "radio",
    col: 6,
    groupId: 1,
    option: [
      { id: uuidv4(), label: "Hoạt động", value: "ACTIVE", name: "status" },
      {
        id: uuidv4(),
        label: "Không hoạt động",
        value: "INACTIVE",
        name: "status",
      },
    ],
  },
];
export const initialCourseLesson = [
  {
    id: uuidv4(),
    name: "Tên",
    key: "name",
    value: "",
    disabled: false,
    required: true,
    type: "text",
    groupId: 1,
    col: 12,
    course_chapters: initialCourseChapter,
  },
];