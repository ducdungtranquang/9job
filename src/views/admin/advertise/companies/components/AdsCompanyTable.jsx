/* eslint-disable react/jsx-pascal-case */
import { ActionIcon, Flex, Stack, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Avatar, Tooltip } from "@mui/material";
import { IconCircleCheck, IconCircleMinus } from "@tabler/icons-react";
import {
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accecptCompany, rejectCompany } from "services/company.service";
import { fetchCompanyData, setPage, setPageSize } from "store/companyReducer";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";
import JobDetail from "./JobDetail";

const AdsCompanyTable = ({ toggleCreate }) => {
  const { listCompanies, page, per_page, total_items } = useSelector(
    (state) => state.companies
  );
  const dispatch = useDispatch();

  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const params = {
      search: globalFilter, // filter search
    };
    dispatch(fetchCompanyData(params));
  }, [dispatch, globalFilter, page, per_page]);

  useEffect(() => {
    dispatch(setPage(pagination.pageIndex + 1));
    dispatch(setPageSize(pagination.pageSize));
  }, [pagination, dispatch]);

  const columns = [
    {
      accessorKey: "is_ads",
      header: "Đang quảng cáo",
      Cell: ({ cell }) => (
        <Stack
          sx={(theme) => ({
            backgroundColor: cell.getValue()
              ? theme.colors.blue[9]
              : theme.colors.gray[9],
            borderRadius: "4px",
            color: "#fff",
            textAlign: "center",
            maxWidth: "9ch",
            padding: "4px",
          })}
        >
          {cell.getValue() ? "Đang quảng cáo" : "Không quảng cáo"}
        </Stack>
      ),
    },
    {
      accessorKey: "logo_src",
      header: "Logo",
      Cell: ({ cell, row }) => (
        <Avatar src={cell.getValue() } />
      ),
    },
    {
      accessorKey: "name",
      header: "Tên Công ty",
    },
    {
      accessorKey: "company_email",
      header: "Email công ty",
    },
    {
      accessorKey: "tax_code",
      header: "Tax",
    },
    {
      accessorKey: "company_phone",
      header: "Số điện thoại",
    },
    {
      accessorKey: "address",
      header: "Địa chỉ",
    },
    {
      accessorKey: "priority",
      header: "Độ ưu tiên",
    },
    {
      accessorKey: "number_of_employees",
      header: "Số lượng nhân viên",
    },
    {
      accessorKey: "job_cvs_count",
      header: "Số Cv ứng tuyến",
    },

    {
      accessorKey: "salary_range",
      header: "Lương",
    },
    // {
    //   accessorKey: "coins_plus",
    //   header: "Xu",
    //   Cell: ({ cell }) => (
    //     <Stack
    //       sx={(theme) => ({
    //         backgroundColor:
    //           cell.getValue() < 100
    //             ? theme.colors.red[9]
    //             : cell.getValue() >= 100 && cell.getValue() < 500
    //             ? theme.colors.yellow[9]
    //             : theme.colors.green[9],
    //         borderRadius: "4px",
    //         color: "#fff",
    //         textAlign: "center",
    //         maxWidth: "9ch",
    //         padding: "4px",
    //       })}
    //     >
    //       {cell.getValue()}
    //     </Stack>
    //   ),
    // },
  ];

  const modalConfirmAcceptJohb = (row) =>
    modals.openConfirmModal({
      title: "Phê duyệt công việc",
      children: <Text>Bạn có muốn bật quảng quảng cáo cho công ty này</Text>,
      labels: { confirm: "Xác nhận", cancel: "Huỷ bỏ" },
      confirmProps: { color: "blue" },
      onConfirm: () => {
        // dispatch(
        //   accecptCompanyData({ id: row.original.id, is_ads: true })
        // ).then((res) => {
        //   console.log("check res: ", res);
        // });
        accecptCompany({ id: row.original.id, is_ads: true })
          .then((res) => {
            dispatch(fetchCompanyData());
            dispatch(setIsToastMessageShow());
            dispatch(
              setMessage({
                message: res.data.message,
                severity: "info",
              })
            );
          })
          .catch((error) => console.log(error));
      },
    });
  const modalConfirmRefuseJohb = (row) =>
    modals.openConfirmModal({
      title: "Từ chối công việc",
      children: <Text>Bạn có muốn tắt quảng cáo cho công ty này</Text>,
      labels: { confirm: "Xác nhận", cancel: "Huỷ bỏ" },
      confirmProps: { color: "red" },
      onConfirm: () =>
        // dispatch(rejectCompanyData({ id: row.original.id, is_ads: false })),
        rejectCompany({ id: row.original.id, is_ads: false })
          .then((res) => {
            dispatch(fetchCompanyData());
            dispatch(setIsToastMessageShow());
            dispatch(
              setMessage({
                message: res.data.message,
                severity: "info",
              })
            );
          })
          .catch((error) => console.log(error)),
    });

  const table = useMantineReactTable({
    columns,
    state: {
      pagination,
    },
    rowCount: total_items || 0,
    enableRowNumbers: true,
    rowNumberMode: "original",
    manualPagination: true,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    data: listCompanies || [], // pass data here
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    enableColumnActions: true,
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
      return <JobDetail data={row.original} />;
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
      <>
        <Flex gap="md">
          <Tooltip label="Phê duyệt">
            <ActionIcon
              color="green"
              size={"md"}
              onClick={() => {
                modalConfirmAcceptJohb(row);
              }}
            >
              <IconCircleCheck />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Hủy duyệt">
            <ActionIcon
              color="orange"
              size={"md"}
              onClick={() => {
                modalConfirmRefuseJohb(row);
              }}
            >
              <IconCircleMinus />
            </ActionIcon>
          </Tooltip>
        </Flex>
        <Flex></Flex>
      </>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default AdsCompanyTable;
