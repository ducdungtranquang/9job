import { v4 as uuidv4 } from "uuid";
import { ACTIVITIES_FOLDER } from "./FileNameConstant";


export const initialContentCard = [
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
    folderName: ACTIVITIES_FOLDER,
    order: 1,
  },
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
    order: 2,

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
    order: 3,

  },
  {
    id: uuidv4(),
    name: "Chữ trên nút",
    key: "button_label",
    value: "Truy cập",
    disabled: false,
    required: false,
    type: "text",
    groupId: 1,
    col: 12,
    order: 4,

  },
  {
    id: uuidv4(),
    name: "Đường dẫn",
    key: "url",
    value: "",
    disabled: false,
    required: true,
    type: "text",
    groupId: 1,
    col: 12,
    order: 5,

  },
];

