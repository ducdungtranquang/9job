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
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createActivities } from "services/activity.service";
import {
  deleteActivityById,
  fetchActivities,
  getActivityByIdData,
  setNewActivity,
} from "store/activityReducer";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";
import { extractTextFromHtml } from "utils/helpers";

const ActivityTable = ({ toggleCreate, category }) => {
  const { listActivities, page, per_page, total_items } = useSelector(
    (state) => state.activities
  );
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    const params = {
      activityCategoryId: category,
      page: pagination.pageIndex + 1,
      per_page: pagination.pageSize,
      search: globalFilter,
    };
    if (category) {
      dispatch(fetchActivities(params));
    }
  }, [dispatch, pagination, globalFilter, category]);

  const columns = [
    {
      accessorKey: "name",
      header: "Tên",
      Cell: ({ cell }) => (
        <Text>
          {cell.getValue() ? extractTextFromHtml(cell.getValue(), 10) : ""}
        </Text>
      ),
    },
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      Cell: ({ cell }) => (
        <Avatar src={cell.getValue()} alt="Câu lạc bộ" variant="square" />
      ),
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
      accessorKey: "description",
      header: "Mô tả",
      Cell: ({ cell }) => (
        <Text>
          {cell.getValue() ? extractTextFromHtml(cell.getValue(), 15) : ""}
        </Text>
      ),
    },

    {
      accessorKey: "created_at",
      header: "Created At",
      Cell: ({ cell }) => (
        <Text>{moment(cell.getValue()).format("DD/MM/YYYY")}</Text>
      ),
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      Cell: ({ cell }) => (
        <Text>{moment(cell.getValue()).format("DD/MM/YYYY")}</Text>
      ),
    },
  ];
  const openCopyRow = async (row) => {
    try {
      let data = { ...row.original };
      delete data.id;
      const response = await createActivities(data);
      if (response) {
        dispatch(setNewActivity(response.data.data));
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
  //DELETE action ok
  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: "Xoá hoạt động",
      children: (
        <Text>
          Bạn có muốn xoá: <strong>{row.original.name}</strong> . Hành động này
          sẽ không thể khôi phục
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => dispatch(deleteActivityById({ id: row.original.id })),
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
    data: listActivities || [],
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    getRowId: (row) => row.id,
    mantineToolbarAlertBannerProps: false
      ? { color: "red", children: "Error loading data" }
      : undefined,
    mantineTableContainerProps: { sx: { minHeight: "500px" } },

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
            size="md"
            onClick={async () => {
              await dispatch(getActivityByIdData(row.original.id));
              toggleCreate();
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Xoá">
          <ActionIcon
            color="red"
            size="md"
            onClick={() => {
              openDeleteConfirmModal(row);
            }}
          >
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

export default ActivityTable;
