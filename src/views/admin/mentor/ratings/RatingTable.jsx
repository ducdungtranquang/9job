/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import { ActionIcon, Flex, Stack, Text, Title, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { Avatar, Rating } from "@mui/material";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
  MantineReactTable,
  MRT_EditActionButtons,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletementorRatingById,
  getMentorRatingData,
  updateMentorRatingData,
} from "store/mentorRatingReducer";
import { extractTextFromHtml } from "utils/helpers";

const RatingTable = ({ toggleCreate, category }) => {
  const dispatch = useDispatch();
  const { listmentorRatings, page, per_page, total_items } = useSelector(
    (state) => state.mentorRatings
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex: page,
    pageSize: per_page,
  });

  useEffect(() => {
    const params = {
      page: pagination.pageIndex,
      per_page: pagination.pageSize,
      search: globalFilter,
    };
    dispatch(getMentorRatingData({ params }));
  }, [dispatch, pagination, globalFilter]);

  const columns = [
    {
      accessorKey: "avatar",
      header: "Avatar",
      enableEditing: false,
      Cell: ({ cell }) => <Avatar src={cell.getValue()} alt="anh" />,
    },
    {
      accessorKey: "name",
      header: "Mentor",
      enableEditing: false,
    },
    {
      accessorKey: "mentee_name",
      header: "Mentee",
      enableEditing: false,
    },
    {
      accessorKey: "rating",
      header: "Đánh giá",
      Cell: ({ cell }) => <Rating value={cell.getValue()} readOnly />,
      mantineEditTextInputProps: {
        error: validationErrors?.rating,
        type: "number",
        onChange: (event) => {
          const value = Number(event.target.value);
          if (value <= 0 || value > 5) {
            setValidationErrors((prev) => ({
              ...prev,
              rating: "Đánh giá không được nhỏ hơn 0 và lớn hơn 5",
            }));
          } else {
            delete validationErrors.rating;
            setValidationErrors({ ...validationErrors });
          }
        },
      },
    },

    {
      accessorKey: "review",
      header: "Đánh giá",
      Cell: ({ cell }) => (
        <Text>
          {cell.getValue() ? extractTextFromHtml(cell.getValue(), 10) : ""}
        </Text>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Ngày tạo",
      enableEditing: false,
      Cell: ({ cell }) => (
        <span>{new Date(cell.getValue()).toLocaleDateString()}</span>
      ),
    },
  ];
  //UPDATE action
  const handleSaveData = async ({ values, table, row }) => {
    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateMentorRatingData({ id: row.id, data: values }));
      table.setEditingRow(null); //exit editing mode
    }
  };

  //DELETE action ok
  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: "Xoá đánh giá",
      children: (
        <Text>
          Bạn có muốn xoá đánh giá của: <strong>{row.original.name}</strong> .
          Hành động này sẽ không thể khôi phục
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () =>
        dispatch(
          deletementorRatingById({
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

    data: listmentorRatings || [], // pass data here
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
        <Tooltip label="Xoá">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <Button
    //     className="bg-brand-500 text-white"
    //     onClick={() => {
    //       toggleCreate();
    //     }}
    //   >
    //     Tạo mới
    //   </Button>
    // ),
  });

  return <MantineReactTable table={table} />;
};

export default RatingTable;
