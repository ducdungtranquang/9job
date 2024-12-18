/* eslint-disable react/jsx-pascal-case */
import {
  ActionIcon,
  Button,
  Flex,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { Avatar } from "@mui/material";
import { IconCopy, IconEdit, IconTrash } from "@tabler/icons-react";
import { COURSE_STATUS } from "constants/CourseConstant";
import {
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewCourse } from "services/courses.service";
import { getInstructors } from "services/instructor.service";
import {
  deleteCourseById,
  getCourseData,
  getCourseDataById,
  setNewCourseToTable
} from "store/courseReducer";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";
import { getAllInstructors } from "store/instructorReducer";

const CourseTableCommon = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { listCourses, page, per_page, total_items } = useSelector(
    (state) => state.courses
    );

  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const params = {
      category: category,
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      search: globalFilter,
    };
    if (category) {
      dispatch(getCourseData({params}));
    }
  }, [dispatch, pagination, globalFilter, category]);

  // get instructor list
  useEffect(() => {
    const getAllInstructor = async() => {
      try {
        const response = await getInstructors();
        dispatch(getAllInstructors(response?.data));
      }
      catch (error) {
        console.log('error: ', error);
        
      }
    }
    getAllInstructor()
   }, [dispatch]);
  
  const columns = [
    {
      accessorKey: "name",
      header: "Tên",
    },
    {
      accessorKey: "thumbnail",
      header: "Thumnail",
      Cell: ({ cell }) => <Avatar src={cell.getValue()} alt="nguoi dung" variant="square"/>,
    },
    {
      accessorKey: "student_numbers",
      header: "Số lượng học viên",
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      Cell: ({ cell }) => (
        <Stack
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() === COURSE_STATUS.ACTIVE
                ? theme.colors.green[9]
                : theme.colors.red[9],
            borderRadius: "4px",
            color: "#fff",
            textAlign: "center",
            maxWidth: "9ch",
            padding: "4px",
          })}
        >
          {cell.getValue()}
        </Stack>
      ),
    },
    {
      accessorKey: "instructor_name",
      header: "Giảng viên",
    },
    {
      accessorKey: "origin_price",
      header: "Giá gốc",
      Cell: ({ cell }) => <span>{Number(cell.getValue())}</span>,
    },
    {
      accessorKey: "discount_price",
      header: "Giá khuyến mãi",
      Cell: ({ cell }) => <span>{Number(cell.getValue())}</span>,
    },
    {
      accessorKey: "point_coin",
      header: "Xu",
    },
    {
      accessorKey: "created_at",
      header: "Ngày tạo",
      Cell: ({ cell }) => (
        <span>{new Date(cell.getValue()).toLocaleDateString()}</span>
      ),
    },
  ];

  const openCopyRow = async (row) => {

    try {
      const response = await createNewCourse(row.original);
  
      if (response) {
        dispatch(setNewCourseToTable(response?.data?.data));
      }
    } catch (error) {
      const msg = JSON.stringify(error?.response?.data);
      dispatch(setIsToastMessageShow());
      dispatch(
        setMessage({
          message: msg,
          severity: "error",
        })
      );
    }
  };
  //DELETE action ok
  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: "Xoá khoá học",
      children: (
        <Text>
          Bạn có muốn xoá: <strong>{row.original.name}</strong> . Hành động này
          sẽ không thể khôi phục
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () =>
        dispatch(deleteCourseById({ id: row.original.id, category: category })),
    });

  const table = useMantineReactTable({
    columns,
    state: {
      pagination,
      globalFilter,
    },
    enableRowNumbers: true,
    rowNumberMode: "original",
    rowCount: total_items || 0,
    manualPagination: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,

    data: listCourses || [], // pass data here
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: false
      ? {
          color: "red",
          children: "Error loading data",
        }
      : undefined,
    mantineTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={3}>Tạo mới</Title>
        {internalEditComponents}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    ),
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
      <Stack>
        <Title order={3}>Cập nhật</Title>
        {internalEditComponents}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    ),
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Sửa">
          <ActionIcon
            color="green"
            onClick={async () => {
              // dispatch(setCourseDetail(row.original));
              await dispatch(getCourseDataById(row.original.id));
              toggleCreate();
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Xoá">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Copy">
          <ActionIcon color="orange" onClick={() => openCopyRow(row)}>
            <IconCopy />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        className="bg-brand-500 text-white"
        onClick={() => {
          toggleCreate();
        }}
      >
        Tạo mới
      </Button>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default CourseTableCommon;
