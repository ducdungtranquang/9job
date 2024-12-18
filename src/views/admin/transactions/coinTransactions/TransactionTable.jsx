/* eslint-disable react/jsx-pascal-case */
import { Button, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Box, Stack } from "@mui/material";
import { IconDownload } from "@tabler/icons-react";
import cn from "classnames";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactionData } from "store/transactionReducer";
import TransactionDetail from "./TransactionDetail";

const TransactionTable = ({ toggleCreate }) => {
  //   const { listusers, page, per_page, total_items } = useSelector(
  //     (state) => state.userV2
  //   );
  const { listTransaction, page, per_page, total_items } = useSelector(
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
    dispatch(getTransactionData({ params }));
  }, [dispatch, pagination, globalFilter]);

  // useEffect(() => {
  //   dispatch(setPage(pagination.pageIndex + 1));
  //   dispatch(setPageSize(pagination.pageSize));
  // }, [pagination, dispatch]);

  const columns = [
    {
      accessorKey: "user_email",
      header: "Người mua",
    },
    {
      accessorKey: "course_name",
      header: "Khóa học",
    },

    {
      accessorKey: "transaction_code",
      header: "Mã giao dịch",
    },
    {
      accessorKey: "coin_amount",
      header: "Số xu thanh toán",
    },
    {
      accessorKey: "payment_amount",
      header: "Só tiền chuyển khoảng",
    },
    {
      accessorKey: "amount",
      header: "Tổng tiển",
    },
    {
      accessorKey: "amount",
      header: "Đối tác",
    },
    {
      accessorKey: "payment_method",
      header: "Phương thức thanh toán",
      Cell: ({ cell }) => (
        <Stack
          className={cn(
            "rounded-md  py-2 text-center text-white",
            cell.getValue() === "both"
              ? "bg-cyan-600"
              : cell.getValue() === "coins"
              ? "bg-yellow-500"
              : "bg-lime-500"
          )}
        >
          {cell.getValue() === "both"
            ? "Cả hai"
            : cell.getValue() === "coins"
            ? "Xu"
            : "Chuyển khoản"}
        </Stack>
      ),
    },
    // {
    //   accessorKey: "payment_method",
    //   header: "Phương thức thanh toán",
    // },
    {
      accessorKey: "created_at",
      header: "Ngày tạo",
      Cell: ({ cell }) => (
        <Text>{moment(cell.getValue()).format("DD/MM/YYYY")}</Text>
      ),
    },
    {
      accessorKey: "updated_at",
      header: "Ngày cập nhật",
      Cell: ({ cell }) => (
        <Text>{moment(cell.getValue()).format("DD/MM/YYYY")}</Text>
      ),
    },
  ];

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const modalConfirmAcceptJohb = (row) =>
    modals.openConfirmModal({
      title: "Phê duyệt công việc",
      children: <Text>Bạn có muốn phê duyệt {row.original.fullName} .</Text>,
      labels: { confirm: "Xác nhận", cancel: "Huy bỏ" },
      confirmProps: { color: "blue" },
      onConfirm: () => {},
    });
  const modalConfirmRefuseJohb = (row) =>
    modals.openConfirmModal({
      title: "Từ chối công việc",
      children: (
        <Text>Bạn có muốn từ chối phê duyệt {row.original.fullName}. phục</Text>
      ),
      labels: { confirm: "Xác nhận", cancel: "Huy bỏ" },
      confirmProps: { color: "red" },
      onConfirm: () => {},
    });

  const prepareDataForCSV = (data) => {
    const result = [];

    data.forEach((item) => {
      const baseTransaction = {
        "ID giao dịch": item.transaction_id,
        "ID người dùng": item.user_id,
        "Tên người dùng": item.user_name,
        "ID khóa học": item.course_id,
        "Tên khóa học": item.course_name,
        "ID nguồn": item.source_id,
        "Tên nguồn": item.source_name,
        "Số tiền": item.amount,
        "Số lượng xu": item.coin_amount,
        "Số tiền thanh toán": item.payment_amount,
        "Phương thức thanh toán": item.payment_method,
        "Mã giao dịch": item.transaction_code,
        "Ngày tạo": moment(item.created_at).format("DD/MM/YYYY"),
      };

      if (item.wallet_transactions && item.wallet_transactions.length > 0) {
        item.wallet_transactions.forEach((walletTransaction) => {
          result.push({
            ...baseTransaction,
            "ID giao dịch ví": walletTransaction.wallet_transaction_id,
            "ID nguồn ví": walletTransaction.wallet_source_id,
            "Tên nguồn ví": walletTransaction.source_name,
            "Hoàn xu ví": walletTransaction.coins_refund,
            "Phần trăm hiện tại ví": walletTransaction.current_percent,
            "ID ví xu người dùng": walletTransaction.user_coin_wallet_id,
            "Số xu ví": walletTransaction.wallet_coins,
            "Phần trăm hiện tại ví xu":
              walletTransaction.wallet_current_percent,
          });
        });
      } else {
        result.push(baseTransaction);
      }
    });

    return result;
  };

  const handleExportData = () => {
    console.log("check list transaction: ", listTransaction);
    const preparedData = prepareDataForCSV(listTransaction);
    const csv = generateCsv(csvConfig)(preparedData);
    download(csvConfig)(csv);
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
    data: listTransaction || [], // pass data here
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: false,
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

    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          // color="lightblue"
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          leftIcon={<IconDownload />}
          variant="filled"
          className="bg-green-700 text-white"
        >
          Xuất Dữ liệu
        </Button>
      </Box>
    ),

    renderDetailPanel: ({ row }) => {
      return <TransactionDetail data={row.original.wallet_transactions} />;
    },

    // renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
    //   <Stack>
    //     <Title order={3}>Tạo mới</Title>
    //     {internalEditComponents}
    //     <Flex justify="flex-end" mt="xl">
    //       <MRT_EditActionButtons variant="text" table={table} row={row} />
    //     </Flex>
    //   </Stack>
    // ),
    // renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
    //   <Stack>
    //     <Title order={3}>Cập nhật</Title>
    //     {internalEditComponents}
    //     <Flex justify="flex-end" mt="xl">
    //       <MRT_EditActionButtons variant="text" table={table} row={row} />
    //     </Flex>
    //   </Stack>
    // ),
    // renderRowActions: ({ row, table }) => (
    //   <Flex gap="md">
    //     <Tooltip label="Phê duyệt">
    //       <ActionIcon
    //         color="green"
    //         size={"md"}
    //         onClick={() => {
    //           modalConfirmAcceptJohb(row);
    //         }}
    //       >
    //         <IconCircleCheck />
    //       </ActionIcon>
    //     </Tooltip>
    //     <Tooltip label="Hủy duyệt">
    //       <ActionIcon
    //         color="orange"
    //         size={"md"}
    //         onClick={() => {
    //           modalConfirmRefuseJohb(row);
    //         }}
    //       >
    //         <IconCircleMinus />
    //       </ActionIcon>
    //     </Tooltip>
    //   </Flex>
    // ),
  });

  return <MantineReactTable table={table} />;
};

export default TransactionTable;
