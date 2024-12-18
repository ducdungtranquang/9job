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
import { Avatar } from "@mui/material";
import { IconEdit } from "@tabler/icons-react";
import { BannerWebPageConstants } from "constants/BannerConstant";
import {
  MantineReactTable,
  MRT_EditActionButtons,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBannersWebByIdData, getBannersWebData } from "store/bannersWebsiteReducer";
import { extractTextFromHtml, mappingDataInArray } from "utils/helpers";

const BannerWebTable = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { listBannersWeb, page, per_page, total_items } = useSelector(
    (state) => state.bannersWeb
  );

  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 30,
  });

  useEffect(() => {
    const params = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      search: globalFilter,
    };
    dispatch(getBannersWebData({ params }));
  }, [dispatch, pagination, globalFilter]);

  const columns = [
    {
      accessorKey: "thumbnail",
      header: "Thumnail",
      Cell: ({ cell }) => (
        <Avatar src={cell.getValue()} alt="anh quang cao" variant="square" />
      ),
    },
    {
      accessorKey: "page_id",
      header: "Trang",
      Cell: ({ cell }) => (
        <Text>
          {mappingDataInArray(cell.getValue(), BannerWebPageConstants)}
        </Text>
      ),
    },
    {
      accessorKey: "description",
      header: "Nội dung",
      Cell: ({ cell }) => (
        <Text>
          {cell.getValue() ? extractTextFromHtml(cell.getValue(), 15) : ""}
        </Text>
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
  //DELETE action ok
  // const openDeleteConfirmModal = (row) =>
  //   modals.openConfirmModal({
  //     title: "Xoá danh mục",
  //     children: (
  //       <Text>
  //         Bạn có muốn xoá: <strong>{row.original.name}</strong> . Hành động này
  //         sẽ không thể khôi phục
  //       </Text>
  //     ),
  //     labels: { confirm: "Delete", cancel: "Cancel" },
  //     confirmProps: { color: "red" },
  //     onConfirm: () =>
  //       dispatch(
  //         deleteBannersById({
  //           id: row.original.id,
  //         })
  //       ),
  //   });

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

    data: listBannersWeb || [], // pass data here
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
              await dispatch(getBannersWebByIdData(row.original.id));
              toggleCreate();
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        {/* <Tooltip label="Xoá">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip> */}
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

export default BannerWebTable;
