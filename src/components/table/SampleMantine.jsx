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
import { ModalsProvider, modals } from "@mantine/modals";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
    MRT_EditActionButtons,
    MantineReactTable,
    // createRow,
    useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";

import { ADVANCE_SKILL_CAT } from "constants/CategoryConstant";
import { useDispatch, useSelector } from "react-redux";
import { getCourseData } from "store/courseReducer";

const AdvanceTable = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [page, setPage] = useState(0);
  const per_page = 20;
  const {
    courseAdvanceData: { data, total },
  } = useSelector((state) => state.courses);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCourseData({
        category: ADVANCE_SKILL_CAT,
        page: page + 1,
        per_page,
      })
    );
  }, [dispatch, page]);
  const columns = [
    {
      accessorKey: "id",
      header: "Id",
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: "name",
      header: "Tên",
    },
    {
      accessorKey: "instuctor_name",
      header: "Giảng viên",
    },
    {
      accessorKey: "origin_price",
      header: "Giá gốc",
      Cell: ({ cell }) => <span>{cell.getValue().toLocaleString()}</span>,
    },
    {
      accessorKey: "discount_price",
      header: "Giá khuyến mãi",
      Cell: ({ cell }) => <span>{cell.getValue().toLocaleString()}</span>,
    },
    {
      accessorKey: "point_coin",
      header: "Xu",
    },
    {
      accessorKey: "created_at",
      header: "Ngày tạo",
      Cell: ({ cell }) => (
        <span>{new Date(cell.getValue()).toLocaleDateString()}</span>
      ),
    },
  ];

  //call CREATE hook
  // const { mutateAsync: createUser, isLoading: isCreatingUser } =
  //   useCreateUser();
  // //call READ hook
  // const {
  //   data: fetchedUsers = [],
  //   isError: isLoadingUsersError,
  //   isFetching: isFetchingUsers,
  //   isLoading: isLoadingUsers,
  // } = useGetUsers();
  // //call UPDATE hook
  // const { mutateAsync: updateUser, isLoading: isUpdatingUser } =
  //   useUpdateUser();
  // //call DELETE hook
  // const { mutateAsync: deleteUser, isLoading: isDeletingUser } =
  //   useDeleteUser();

  //CREATE action
  const handleCreateUser = async ({ values, exitCreatingMode }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // await createUser(values);
    exitCreatingMode();
  };

  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    // await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };

  //DELETE action
  const openDeleteConfirmModal = (row) =>
    modals.openConfirmModal({
      title: "Are you sure you want to delete this user?",
      children: (
        <Text>
          Are you sure you want to delete {row.original.firstName}{" "}
          {row.original.lastName}? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      // onConfirm: () => deleteUser(row.original.id),
    });

  const table = useMantineReactTable({
    columns,
    data: data || [],
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
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
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
        <Tooltip label="Edit">
          <ActionIcon onClick={() => table.setEditingRow(row)}>
            <IconEdit />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete">
          <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        className="bg-brand-500 text-white"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Tạo mới
      </Button>
    ),
    state: {
      // isLoading: isLoadingUsers,
      // isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      // showAlertBanner: isLoadingUsersError,
      // showProgressBars: isFetchingUsers,
    },
  });

  return <MantineReactTable table={table} />;
};

//CREATE hook (post new user to api)
function useCreateUser() {}

//READ hook (get users from api)
function useGetUsers() {}

//UPDATE hook (put user in api)
function useUpdateUser() {}

//DELETE hook (delete user in api)
function useDeleteUser() {}

const Advancourse = () => {

  return (
    <ModalsProvider>
      <AdvanceTable  />
    </ModalsProvider>
  );
};

export default Advancourse;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function validateUser(user) {
  return {
    firstName: !validateRequired(user.firstName)
      ? "First Name is Required"
      : "",
    lastName: !validateRequired(user.lastName) ? "Last Name is Required" : "",
    email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
  };
}
