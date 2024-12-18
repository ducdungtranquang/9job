/* eslint-disable react/jsx-pascal-case */
import { ActionIcon, Flex, Stack, Text, Title, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Avatar, Typography } from "@mui/material";
import { IconCircleCheck, IconCircleMinus } from "@tabler/icons-react";
import {
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMentorData, updateMentorById } from "store/mentorReducer";
import MentorDetailPage from "./MentorDetail";
// import JobDetail from "./JobDetail";

const MentorTable = ({ toggleCreate }) => {
  const { listmentors,  total_items } = useSelector(
    (state) => state.mentors
  );
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0 ,
    pageSize: 10,
  });
  useEffect(() => {
    const params = {
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      search: globalFilter,
    };
    dispatch(getMentorData({ params }));
  }, [dispatch, pagination, globalFilter]);

  // useEffect(() => {
  //   dispatch(setPage(pagination.pageIndex + 1));
  //   dispatch(setPageSize(pagination.pageSize));
  // }, [pagination, dispatch]);

  const columns = [
    {
      accessorKey: "avatar",
      header: "Avatar",
      Cell: ({ renderedCellValue, row }) => (
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Avatar
            sx={{ width: 50, height: 50 }}
            src={row.original.avatar}
            alt="avatar"
          />
        </Stack>
      ),
    },
    {
      accessorKey: "name",
      header: "Tên",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "active",
      header: "Trạng thái",
      Cell: ({ cell }) => (
        <Stack
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() === 1
                ? theme.colors.green[9]
                : theme.colors.red[9],
            borderRadius: "4px",
            color: "#fff",
            textAlign: "center",
            maxWidth: "9ch",
            padding: "4px",
          })}
        >
          {cell.getValue() === 1 ? "Active" : "Inactive"}
        </Stack>
      ),
    },
    {
      accessorKey: "mentee_no",
      header: "SL mentee",
    },
    {
      accessorKey: "created_at",
      header: "Ngày tạo",
      Cell: ({ cell }) => (
        <Typography>
          {new Date(cell.getValue()).toLocaleDateString()}
        </Typography>
      ),
    },
  ];

  const modalConfirmUpdate = (row) =>
    modals.openConfirmModal({
      title: "Phê duyệt mentor",
      children: <Text>Bạn có muốn phê duyệt {row.original.name} .</Text>,
      labels: { confirm: "Xác nhận", cancel: "Huỷ bỏ" },
      confirmProps: { color: "blue" },
      onConfirm: () => {
        dispatch(
          updateMentorById({ id: row.original.id, data: { active: 1 } })
        );
      },
    });
  const modalConfirmDelete = (row) =>
    modals.openConfirmModal({
      title: "Xoá mentor",
      children: (
        <Text>Bạn có muốn từ chối người dùng: {row.original.name}</Text>
      ),
      labels: { confirm: "Xác nhận", cancel: "Huỷ bỏ" },
      confirmProps: { color: "red" },
      onConfirm: () =>
        dispatch(
          updateMentorById({ id: row.original.id, data: { active: 0 } })
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
    data: listmentors || [], // pass data here
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    // enableColumnActions: true,
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
      return <MentorDetailPage data={row.original} />;
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
        <Title order={3}>Phê duyệt</Title>
        {internalEditComponents}
        <Flex justify="flex-end" mt="xl">
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </Flex>
      </Stack>
    ),
    renderRowActions: ({ row, table }) => (
      <Flex gap="md">
        <Tooltip label="Phê duyệt">
          <ActionIcon
            color="green"
            size={"md"}
            onClick={() => {
              modalConfirmUpdate(row);
            }}
          >
            <IconCircleCheck />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Từ chối">
          <ActionIcon
            color="orange"
            size={"md"}
            onClick={() => {
              modalConfirmDelete(row);
            }}
          >
            <IconCircleMinus />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default MentorTable;
