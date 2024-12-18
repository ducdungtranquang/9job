/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  MantineReactTable,
  MRT_EditActionButtons,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewHandbook } from "services/hanbook.service";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";
import {
  deleteHandBookById,
  getHandbookByIdData,
  getHandBookData,
  setNewHandbook,
} from "store/handbookReducer";
import { getUniversityData } from "store/universityReducer";

const HandBookTable = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { listHandBook, page, per_page, total_items } = useSelector(
    (state) => state.handbooks
  );
  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: per_page,
  });

  useEffect(() => {
    const params = {
      student_category_id: category,
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      search: globalFilter,
    };
    dispatch(getHandBookData({ params }));
  }, [dispatch, category, pagination, globalFilter]);

  // get universities list
  useEffect(() => {
    dispatch(getUniversityData());
  }, [dispatch]);

  const columns = [
    {
      accessorKey: "name",
      header: "Tên",
    },
    {
      accessorKey: "thumbnail",
      header: "Thumnail",
      Cell: ({ cell }) => (
        <Avatar src={cell.getValue()} alt="cam nang sinh vien" variant="square" />
      ),
    },
    {
      accessorKey: "school_name",
      header: "Tên trường học",
    },
    {
      accessorKey: "link",
      header: "web trường",
      Cell: ({ cell }) => (
        <span> {cell.getValue() === null ? "-" : cell.getValue()}</span>
      ),
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
       let data = { ...row.original };
       delete data.id;
       const response = await createNewHandbook(data);
       if (response) {
         dispatch(setNewHandbook(response.data.data));
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
      title: "Xoá danh mục",
      children: (
        <Text>
          Bạn có muốn xoá: <strong>{row.original.name}</strong> . Hành động này
          sẽ không thể khôi phục
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () =>
        dispatch(
          deleteHandBookById({
            id: row.original.id,
          })
        ),
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

    data: listHandBook || [], // pass data here
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
              await dispatch(getHandbookByIdData(row.original.id));
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

export default HandBookTable;
