/* eslint-disable react/jsx-pascal-case */
import { Flex, Stack, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Avatar, Button } from "@mui/material";
import { CV_JOB_STATUS } from "constants/JobConstant";
import {
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCVJobData, setPage, setPageSize } from "store/cvJobReducer";

const CvTable = () => {
  const { listCVJobs, page, per_page, total_items } = useSelector(
    (state) => state.cvJobs
  );
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(fetchCVJobData());
  }, [dispatch, page, per_page]);

  useEffect(() => {
    dispatch(setPage(pagination.pageIndex + 1));
    dispatch(setPageSize(pagination.pageSize));
  }, [pagination, dispatch]);

  const columns = [
    {
      accessorKey: "user",
      header: "Avatar",
      Cell: ({ cell }) => (
        <Avatar alt={cell.getValue().username} src={cell.getValue().avatar} />
      ),
    },
    {
      accessorKey: "job.name",
      header: "Tên việc làm",
      // Cell: ({ cell }) => <Text>{cell.getValue().job.name}</Text>,
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      Cell: ({ cell }) => (
        <Stack
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() === CV_JOB_STATUS.POSTED
                ? theme.colors.blue[9]
                : cell.getValue() === CV_JOB_STATUS.INACTIVE
                ? theme.colors.gray[9]
                : cell.getValue() === CV_JOB_STATUS.REFUSE
                ? theme.colors.red[9]
                : cell.getValue() === CV_JOB_STATUS.PENDING
                ? theme.colors.yellow[9]
                : theme.colors.yellow[9],
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
      accessorKey: "user_cv",
      header: "Cv File",
      Cell: ({ cell }) => (
        <Button
          variant="contained"
          color="primary"
          href={cell.getValue().file_path}
          target="_blank"
          rel="noopener noreferrer"
        >
          Xem CV
        </Button>
      ),
    },

    {
      accessorKey: "note",
      header: "Ghi chú",
    },
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

  const modalConfirmAcceptJohb = (row) =>
    modals.openConfirmModal({
      title: "Phê duyệt công việc",
      children: <Text>Bạn có muốn phê duyệt Cv này .</Text>,
      labels: { confirm: "Xác nhận", cancel: "Huy bỏ" },
      confirmProps: { color: "blue" },
      onConfirm: () => {},
    });
  const modalConfirmRefuseJohb = (row) =>
    modals.openConfirmModal({
      title: "Từ chối công việc",
      children: <Text>Bạn có muốn từ chối phê duyệt Cv này không</Text>,
      labels: { confirm: "Xác nhận", cancel: "Huy bỏ" },
      confirmProps: { color: "red" },
      onConfirm: () => {},
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
    // enableColumnActions: false,
    onPaginationChange: setPagination,
    data: listCVJobs || [], // pass data here
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    // enableEditing: true,
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
      // <Flex gap="md">
      //   <Tooltip label="Phê duyệt">
      //     <ActionIcon
      //       color="green"
      //       size={"md"}
      //       onClick={() => {
      //         modalConfirmAcceptJohb(row);
      //       }}
      //     >
      //       <IconCircleCheck />
      //     </ActionIcon>
      //   </Tooltip>
      //   <Tooltip label="Hủy duyệt">
      //     <ActionIcon
      //       color="orange"
      //       size={"md"}
      //       onClick={() => {
      //         modalConfirmRefuseJohb(row);
      //       }}
      //     >
      //       <IconCircleMinus />
      //     </ActionIcon>
      //   </Tooltip>
      // </Flex>
      <Flex></Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default CvTable;
