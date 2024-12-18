/* eslint-disable react/jsx-pascal-case */
import { ActionIcon, Flex, Stack, Text, Title, Tooltip } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { CONTACT, CONTACT_STATUS } from "constants/StatusConstant";
import {
  MRT_EditActionButtons,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactDataById, getContactMailData, updateContactDataById } from "store/contactReducer";

const ContactTable = ({ toggleCreate }) => {
  const { listcontacts, page, per_page, total_items } = useSelector(
    (state) => state.contacts
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
    dispatch(getContactMailData({params}));
  }, [dispatch, pagination, globalFilter]);


  const columns = [
    {
      accessorKey: "status",
      header: "Trạng thái",
      editVariant: "select",
      mantineEditSelectProps: {
        data: CONTACT_STATUS,
      },
      Cell: ({ cell }) => (
        <Stack
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() === CONTACT.DONE
                ? theme.colors.green[9]
                : cell.getValue() === CONTACT.PENDING
                ? theme.colors.gray[9]
                : theme.colors.blue[9],
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
      accessorKey: "fullName",
      header: "Tên",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "SDT",
    },
    {
      accessorKey: "company",
      header: "Công ty",
    },
    {
      accessorKey: "purpose",
      header: "Mục đích",
    },
    {
      accessorKey: "note",
      header: "Ghi chú",
    },
  ];

  //UPDATE action
  const handleSaveData = async ({ values, table, row }) => {
    dispatch(updateContactDataById({ id: row.id, data: values }));
    table.setEditingRow(null); //exit editing mode
  };

  const modalConfirmDelete = (row) =>
    modals.openConfirmModal({
      title: "Xoá liên hệ",
      children: (
        <Text>Bạn có muốn xoá liên hệ của: {row.original.fullName}</Text>
      ),
      labels: { confirm: "Xác nhận", cancel: "Huỷ bỏ" },
      confirmProps: { color: "red" },
      onConfirm: () => dispatch(deleteContactDataById({ id: row.original.id })),
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
    data: listcontacts || [], // pass data here
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
        <Tooltip label="Cập nhật">
          <ActionIcon
            color="green"
            size={"md"}
            onClick={() => table.setEditingRow(row)}
          >
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Xoá">
          <ActionIcon
            color="red"
            size={"md"}
            onClick={() => {
              modalConfirmDelete(row);
            }}
          >
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default ContactTable;
