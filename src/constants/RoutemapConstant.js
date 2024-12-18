import { v4 as uuidv4 } from "uuid";



export const initialRoadmap = [
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
    type: "ckEditor",
    groupId: 1,
    col: 12,
  },
];

