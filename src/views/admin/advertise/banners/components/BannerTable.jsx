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
import { BannerPageConstants, BannerPositionConstants } from "constants/BannerConstant";
import {
  MantineReactTable,
  MRT_EditActionButtons,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewBanner } from "services/banners.service";
import { deleteBannersById, getBannersByIdData, getBannersData, setNewBanners } from "store/bannersReducer";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";
import { mappingDataInArray } from "utils/helpers";

const BannerTable = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { listBanners, page, per_page, total_items } = useSelector(
    (state) => state.banners
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
    dispatch(getBannersData({ params }));
  }, [dispatch, pagination, globalFilter]);

 const openCopyRow = async (row) => {
   try {
     let data = { ...row.original };
     delete data.id;
     const response = await createNewBanner(data);
     if (response) {
       dispatch(setNewBanners(response.data.data));
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
        <Text>{mappingDataInArray(cell.getValue(), BannerPageConstants)}</Text>
      ),
    },
    {
      accessorKey: "position",
      header: "Vị trí",
      Cell: ({ cell }) => (
        <Text>{mappingDataInArray(cell.getValue(), BannerPositionConstants)}</Text>
      ),
    },
    {
      accessorKey: "status",
      header: "Tình trạng",
      Cell: ({ cell }) => (
        <Stack
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() === "active"
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
      accessorKey: "expired",
      header: "Thời hạn",
      Cell: ({ cell }) =>
        new Date(cell.getValue()) > new Date() ? (
          <span className="text-green-500">{cell.getValue()} </span>
        ) : (
          <span className="text-red-500">{cell.getValue()} </span>
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
          deleteBannersById({
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

    data: listBanners || [], // pass data here
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
              await dispatch(getBannersByIdData(row.original.id));
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

export default BannerTable;