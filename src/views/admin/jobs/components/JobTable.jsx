/* eslint-disable react/jsx-pascal-case */
import { ActionIcon, Flex, Select, Stack, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Avatar, Tooltip } from "@mui/material";
import { IconEdit } from "@tabler/icons-react";
import { JOB_STATUS } from "constants/JobConstant";
import {
  JOB_SELECT_STATUS,
  JOB_TAG_STATUS,
  PRIORITY_MAP,
  PRIORITY_SELECT,
  PRIORITY_STATUS,
} from "constants/StatusConstant";
import {
  MantineReactTable,
  MRT_EditActionButtons,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  accecptJobData,
  fetchJobData,
  rejectJobData,
  setPage,
  setPageSize,
  setParams,
  updateJobById,
} from "store/jobReducer";
import { mapPriorityToLabel } from "utils/helpers";
import JobDetail from "./JobDetail";

const JobTable = ({ toggleCreate }) => {
  const { listJobs, page, per_page, total_items } = useSelector(
    (state) => state.jobs
  );

  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(fetchJobData());
  }, [dispatch, page, per_page]);

  useEffect(() => {
    dispatch(setPage(pagination.pageIndex + 1));
    dispatch(setPageSize(pagination.pageSize));
    dispatch(setParams("newest"));
  }, [pagination, dispatch]);

  const columns = [
    {
      accessorKey: "company.logo_src",
      header: "Logo",
      enableEditing: false,
      Cell: ({ cell, row }) => (
        <Avatar
          src={cell.getValue()}
          style={{ borderRadius: "50%" }}
          alt="avatar"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Tên Công việc",
    },
    {
      accessorKey: "priority",
      header: "Độ ưu tiên",
      editVariant: "select",
      mantineEditSelectProps: {
        data: PRIORITY_STATUS,
      },
      Cell: ({ cell }) => (
        <Text sx={{ color: cell.getValue() == 1 ? "green" : "red" }}>
          {mapPriorityToLabel(cell.getValue(), PRIORITY_MAP)}
        </Text>
      ),
      Edit: ({ cell, table, row, column }) => {
        return (
          <Select
            label="Hiện thị"
            data={PRIORITY_SELECT}
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        );
      },
    },
    {
      accessorKey: "tag",
      header: "Tag",
      editVariant: "select",
      mantineEditSelectProps: {
        data: JOB_TAG_STATUS,
      },
    },
    {
      accessorKey: "job_cvs_count",
      header: "Số Cv ứng tuyến",
      enableEditing: false,
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      editVariant: "select",
      mantineEditSelectProps: {
        data: JOB_SELECT_STATUS,
      },
      Cell: ({ cell }) => (
        <Stack
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() === JOB_STATUS.POSTED
                ? theme.colors.blue[9]
                : cell.getValue() === JOB_STATUS.INACTIVE
                ? theme.colors.gray[9]
                : cell.getValue() === JOB_STATUS.REFUSE
                ? theme.colors.red[9]
                : cell.getValue() === JOB_STATUS.PENDING
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
      accessorKey: "salary_range",
      header: "Lương",
      enableEditing: false,
    },
  ];

  //UPDATE action
  const handleSaveData = async ({ values, table, row }) => {
    // let priority = values?.priority === "Ưu tiên" ? 1 : 0;
    let priority = value;
    dispatch(updateJobById({ id: row.id, data: { ...values, priority } }));
    table.setEditingRow(null); //exit editing mode
    setValue("");
  };

  const modalConfirmAcceptJohb = (row) =>
    modals.openConfirmModal({
      title: "Phê duyệt công việc",
      children: <Text>Bạn có muốn phê duyệt công việc này</Text>,
      labels: { confirm: "Xác nhận", cancel: "Huy bỏ" },
      confirmProps: { color: "blue" },
      onConfirm: () => {
        dispatch(accecptJobData({ id: row.original.id }));
      },
    });
  const modalConfirmRefuseJohb = (row) =>
    modals.openConfirmModal({
      title: "Từ chối công việc",
      children: <Text>Bạn có muốn từ chối phê duyệt công việc này</Text>,
      labels: { confirm: "Xác nhận", cancel: "Huy bỏ" },
      confirmProps: { color: "red" },
      onConfirm: () => dispatch(rejectJobData({ id: row.original.id })),
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
    data: listJobs || [], // pass data here
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    enableColumnActions: true,
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
    renderEditRowModalContent: ({ table, row, internalEditComponents }) => {
      return (
        <Stack>
          <Title order={3}>Cập nhật</Title>
          {internalEditComponents}
          <Flex justify="flex-end" mt="xl">
            <MRT_EditActionButtons variant="text" table={table} row={row} />
          </Flex>
        </Stack>
      );
    },
    renderRowActions: ({ row, table }) => (
      <>
        <Flex gap="md">
          <Tooltip label="Cập nhật">
            <ActionIcon
              color="green"
              size={"md"}
              onClick={() => {
                setValue(row.original.priority);
                table.setEditingRow(row);
              }}
            >
              <IconEdit />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default JobTable;
