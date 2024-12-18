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
import { Avatar, Box } from "@mui/material";
import {
  IconDownload,
  IconEdit,
  IconTrash
} from "@tabler/icons-react";
import { USER_ROLE } from "constants/RoleConstant";
import { USERS_STATUS } from "constants/userConstant";
import { download, generateCsv, mkConfig } from "export-to-csv";
import {
  MantineReactTable,
  MRT_EditActionButtons,
  useMantineReactTable,
} from "mantine-react-table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exportData, updateUserProfileFromAdmin } from "services/user.service";
import { setIsToastMessageShow, setMessage } from "store/globalReducer";
import {
  deleteUserById,
  fetchuserV2Data,
  setPage,
  setPageSize,
} from "store/userV2Reducer";

const UserTable = ({ toggleCreate }) => {
  const { listusers, page, per_page, total_items } = useSelector(
    (state) => state.userV2
  );
  const dispatch = useDispatch();
  const [globalFilter, setGlobalFilter] = useState("");

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
     const params = {
       role: USER_ROLE,
       search: globalFilter,
     };
    dispatch(fetchuserV2Data({ params }));
  }, [dispatch, page, per_page, globalFilter]);

  useEffect(() => {
    dispatch(setPage(pagination.pageIndex + 1));
    dispatch(setPageSize(pagination.pageSize));
  }, [pagination, dispatch]);

  const columns = [
    {
      accessorKey: "avatar",
      header: "avatar",
      enableEditing: false,
      Cell: ({ cell }) => <Avatar src={cell.getValue()} alt="nguoi dung" />,
    },
    {
      accessorKey: "fullName",
      header: "Họ và tên",
      enableEditing: false,
    },
    {
      accessorKey: "referral_code",
      header: "Mã giới thiệu",
      enableEditing: false,
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      editVariant: "select",
      mantineEditSelectProps: {
        data: USERS_STATUS,
      },
      Cell: ({ cell }) => (
        <Stack
          sx={(theme) => ({
            backgroundColor:
              cell.getValue() === "active"
                ? theme.colors.green[9]
                : theme.colors.red[9],
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
      accessorKey: "email",
      header: "email",
      enableEditing: false,
    },
    {
      accessorKey: "birthday",
      header: "Ngày sinh",
      enableEditing: false,
    },
    {
      accessorKey: "phone_number",
      header: "Số điện thoại",
      enableEditing: false,
    },

    {
      accessorKey: "coins",
      header: "Xu",
      enableEditing: false,

      Cell: ({ cell }) => (
        <Text
          sx={(theme) => ({
            color:
              cell.getValue() < 100
                ? theme.colors.red[9]
                : cell.getValue() >= 100 && cell.getValue() < 500
                ? theme.colors.yellow[9]
                : theme.colors.green[9],
          })}
        >
          {cell.getValue()}
        </Text>
      ),
    },
    {
      accessorKey: "job_position",
      header: "Chức vụ",
      enableEditing: false,
    },
    {
      accessorKey: "company_name",
      header: "Tên công ty",
      enableEditing: false,
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

  const handleSaveUser = async ({ values, table, row }) => {
    try {
      let data = {
        id: row.id,
        ...values,
      };
      await updateUserProfileFromAdmin(data);
      table.setEditingRow(null); //exit editing mode
    } catch (error) {
      dispatch(setIsToastMessageShow());
      dispatch(
        setMessage({
          message: "Đã xảy ra lỗi, xin thử lại sau!",
          severity: "error",
        })
      );
    }
  };
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: 'danh sach nguoi dung'
  });

  const handleExportData = async() => {
    try {
      const response = await exportData({role: USER_ROLE})
      if (response.data) {
        const csv = generateCsv(csvConfig)(response.data);
        download(csvConfig)(csv);
      }
      
    }
    catch (error) {
       dispatch(setIsToastMessageShow());
       dispatch(
         setMessage({
           message: "Đã xảy ra lỗi, xin thử lại sau!",
           severity: "error",
         })
       );
    }
      
    };
  
  const modalConfirmDelete = (row) =>
    modals.openConfirmModal({
      title: "Từ chối admin",
      children: (
        <Text>
          Bạn có muốn xoá nhà tuyển dụng: {row.original.fullName}. Hành động này
          không thể khôi phục
        </Text>
      ),
      labels: { confirm: "Xác nhận", cancel: "Huy bỏ" },
      confirmProps: { color: "red" },
      onConfirm: () => dispatch(deleteUserById({ id: row.original.id })),
    });

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

    data: listusers || [], // pass data here
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "row", //default ('row', 'cell', 'table', and 'custom' are also available)
    onEditingRowSave: handleSaveUser,
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

    // renderDetailPanel: ({ row }) => {
    //   return <JobDetail data={row.original} />;
    // },

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
            color="orange"
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
          color="lightblue"
          onClick={handleExportData}
          leftIcon={<IconDownload />}
          className="bg-green-700"
        >
          Xuất file
        </Button>
      </Box>
    ),
  });

  return <MantineReactTable table={table} />;
};

export default UserTable;
