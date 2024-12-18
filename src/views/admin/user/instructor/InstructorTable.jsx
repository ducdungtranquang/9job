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
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInstructorById,
  getInstructorByIdData,
  getInstructorList,
} from "store/instructorReducer";
import { getUniversityData } from "store/universityReducer";

const InstructorTable = ({ toggleCreate }) => {
  const { intructorData, page, per_page, total_items } = useSelector(
    (state) => state.instructors
  );

  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: page,
    pageSize: per_page,
  });

  useEffect(() => {
    const params = {
      page: pagination.pageIndex,
      per_page: pagination.pageSize,
      search: globalFilter,
    };
    dispatch(getInstructorList({ params }));
  }, [dispatch, pagination, globalFilter]);

  // get universities list
  useEffect(() => {
    dispatch(getUniversityData());
  }, [dispatch]);

  const columns = [
    {
      accessorKey: "name",
      header: "Họ và tên",
    },
    {
      accessorKey: "avatar",
      header: "avatar",
      Cell: ({ cell }) => <Avatar src={cell.getValue()} alt="giang vien" />,
    },

    {
      accessorKey: "year_of_experience",
      header: "Năm kinh nghiệm",
    },

    {
      accessorKey: "school_id",
      header: "Trường học",
    },
    {
      accessorKey: "education_level",
      header: "Học vấn",
    },
    {
      accessorKey: "created_at",
      header: "Ngày tạo",
      Cell: ({ cell }) => (
        <span>{new Date(cell.getValue()).toLocaleDateString()}</span>
      ),
    },
  ];

  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: "Xoá giảng viên",
      children: (
        <Text>
          Bạn có muốn xoá: <strong>{row.original.name}</strong> . Hành động này
          sẽ không thể khôi phục
        </Text>
      ),
      labels: { confirm: "Xác nhận", cancel: "Huy bỏ" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        dispatch(deleteInstructorById({ id: row.original.id }));
      },
    });

  const table = useMantineReactTable({
    columns,
    state: {
      pagination,
      globalFilter,
    },
    rowCount: total_items || 0,
    enableRowNumbers: true,
    rowNumberMode: "original",
    manualPagination: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,

    data: intructorData || [], // pass data here
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
        <Tooltip label="Cập nhật">
          <ActionIcon
            color="green"
            onClick={async () => {
              await dispatch(getInstructorByIdData(row.original.id));
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

export default InstructorTable;
