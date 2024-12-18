/* eslint-disable react/jsx-pascal-case */
import { Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStatusPurchase } from "services/transaction.service";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";
import {
  getAllCoinUserUsed,
  getCoursePurchase,
} from "store/transactionReducer";
import CoinRefundDetail from "./CoinRefundDetail";

const CoinRefundForPartnerTable = ({ toggleCreate }) => {
  //   const { listusers, page, per_page, total_items } = useSelector(
  //     (state) => state.userV2
  //   );
  const { listCoinUserUsed, page, per_page, total_items } = useSelector(
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
    dispatch(getAllCoinUserUsed({ params }));
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
      accessorKey: "total_refund",
      header: "Tổng xu hoàn trả",
    },
    // {
    //   accessorKey: "created_at",
    //   header: "Ngày tạo",
    //   Cell: ({ cell }) => (
    //     <Text>{moment(cell.getValue()).format("DD/MM/YYYY")}</Text>
    //   ),
    // },
    // {
    //   accessorKey: "updated_at",
    //   header: "Ngày cập nhật",
    //   Cell: ({ cell }) => (
    //     <Text>{moment(cell.getValue()).format("DD/MM/YYYY")}</Text>
    //   ),
    // },
  ];

  const modalConfirmAcceptJohb = (row) =>
    modals.openConfirmModal({
      title: "Phê duyệt công việc",
      children: <Text>Bạn có muốn phê duyệt {row.original.fullName} .</Text>,
      labels: { confirm: "Xác nhận", cancel: "Hủy bỏ" },
      confirmProps: { color: "blue" },
      onConfirm: () => {
        try {
          const res = updateStatusPurchase({
            id: row.original.id,
            status: "CONFIRMED",
          });
          if (res) {
            dispatch(getCoursePurchase());
            dispatch(setIsToastMessageShow());
            dispatch(
              setMessage({
                message: "Phê duyệt thành công",
                severity: "success",
              })
            );
          }
        } catch (error) {
          dispatch(setIsToastMessageShow());
          dispatch(
            setMessage({
              message: "Đã có lỗi xãy ra",
              severity: "error",
            })
          );
        }
      },
    });
  const modalConfirmRefuseJohb = (row) =>
    modals.openConfirmModal({
      title: "Từ chối công việc",
      children: (
        <Text>Bạn có muốn từ chối phê duyệt {row.original.fullName}.</Text>
      ),
      labels: { confirm: "Xác nhận", cancel: "Huy bỏ" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        console.log("check row original: ", row.original);
        try {
          const res = updateStatusPurchase({
            id: row.original.id,
            status: "CANCEL",
          });
          if (res) {
            dispatch(getCoursePurchase());
            dispatch(setIsToastMessageShow());
            dispatch(
              setMessage({
                message: "Từ chối phê duyệt thành công",
                severity: "success",
              })
            );
          }
        } catch (error) {
          dispatch(setIsToastMessageShow());
          dispatch(
            setMessage({
              message: "Đã có lỗi xãy ra",
              severity: "error",
            })
          );
        }
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
    data: listCoinUserUsed || [], // pass data here
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

    renderDetailPanel: ({ row }) => {
      return <CoinRefundDetail data={row.original.transactions} />;
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

export default CoinRefundForPartnerTable;
