/* eslint-disable react/jsx-pascal-case */
import { ActionIcon, Flex, Stack, Text, Title } from "@mantine/core";
import { Tooltip } from "@mui/material";
import { IconEdit } from "@tabler/icons-react";
import {
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransferInfoData,
  updateTransferData
} from "store/transactionReducer";
import { setPage, setPageSize } from "store/userV2Reducer";

const TransferInfoTable = ({ toggleCreate }) => {
  //   const { listusers, page, per_page, total_items } = useSelector(
  //     (state) => state.userV2
  //   );
  const { listTransferInfo, page, per_page, total_items } = useSelector(
    (state) => state.transactions
  );
  const dispatch = useDispatch();
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
    dispatch(getTransferInfoData({ params }));
  }, [dispatch, pagination, globalFilter]);

  useEffect(() => {
    dispatch(setPage(pagination.pageIndex + 1));
    dispatch(setPageSize(pagination.pageSize));
  }, [pagination, dispatch]);

  const columns = [
    {
      accessorKey: "course_category.name",
      header: "Đối tác",
      enableEditing: false,
    },
    {
      accessorKey: "bank_id",
      header: "ID ngân hàng",
    },
    {
      accessorKey: "account_number",
      header: "Số tài khoản",
    },
    {
      accessorKey: "owner",
      header: "Chủ tài khoản",
    },
    {
      accessorKey: "created_at",
      header: "Ngày tạo",
      Cell: ({ cell }) => (
        <Text>{moment(cell.getValue()).format("DD/MM/YYYY")}</Text>
      ),
      enableEditing: false,
    },
    {
      accessorKey: "updated_at",
      header: "Ngày cập nhật",
      Cell: ({ cell }) => (
        <Text>{moment(cell.getValue()).format("DD/MM/YYYY")}</Text>
      ),
      enableEditing: false,
    },
  ];

  //UPDATE action
  const handleSaveData = async ({ values, table, row }) => {
      dispatch(updateTransferData({ id: row.id, data: values }));
      table.setEditingRow(null); //exit editing mode
    
  };

  const table = useMantineReactTable({
    columns,
    state: {
      pagination,
      globalFilter
    },
    rowCount: total_items || 0,
    enableRowNumbers: true,
    rowNumberMode: "original",
    manualPagination: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,

    data: listTransferInfo || [], // pass data here
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    getRowId: (row) => row.id,
    onEditingRowSave: handleSaveData,
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
          <ActionIcon color="green" onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default TransferInfoTable;
