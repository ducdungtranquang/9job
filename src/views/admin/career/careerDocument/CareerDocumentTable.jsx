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
import { createCareerDocument } from "services/careerDocument.service";
import {
  deleteCareerDocumentDataById,
  getCareerDocumentlData,
  getCareerDocumentlDataById,
  setNewData,
} from "store/careerDocumentReducer";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";

const CareerDocumentTable = ({ toggleCreate }) => {
  const dispatch = useDispatch();
  const { listCareerDocument, page, per_page, total_items } = useSelector(
    (state) => state.careerDocument
  );
  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const params = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      search: globalFilter,
    };
    dispatch(getCareerDocumentlData({ params }));
  }, [dispatch, pagination, globalFilter]);

  const columns = [
    {
      accessorKey: "name",
      header: "Tên",
    },
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      Cell: ({ cell }) => (
        <Avatar src={cell.getValue()} alt="tai lieu" variant="square" />
      ),
    },
    {
      accessorKey: "category",
      header: "Danh mục",
    },
    {
      accessorKey: "level",
      header: "Trình độ",
   
    },
    {
      accessorKey: "industry",
      header: "Lĩnh vực",
    },
    {
      accessorKey: "career",
      header: "Ngành nghề",
    },

    {
      accessorKey: "created_at",
      header: "Ngày tạo",
      Cell: ({ cell }) => (
        <span>{new Date(cell.getValue()).toLocaleDateString()}</span>
      ),
    },
  ];
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
          deleteCareerDocumentDataById({
            id: row.original.id,
          })
        ),
    });
  const openCopyRow = async (row) => {
    try {
      const response = await createCareerDocument(row.original);
      if (response) {
        dispatch(setNewData(response.data));
      }
    } catch (error) {
      const msg = JSON.stringify(error?.response?.data)
       dispatch(setIsToastMessageShow());
       dispatch(
         setMessage({
           message: msg,
           severity: 'error',
         })
       );
    }
  };

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

    data: listCareerDocument || [], // pass data here
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
              await dispatch(getCareerDocumentlDataById(row.original.id));
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

export default CareerDocumentTable;
