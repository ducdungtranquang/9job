/* eslint-disable react/prop-types */
import { setIsToastMessageShow } from "store/globalReducer";
import { Box, IconButton, Snackbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Close from "@mui/icons-material/Close";
import { useEffect } from "react";

const ToastMessage = () => {
  const { isToastMessageShow, toast } = useSelector((state) => state.global);

  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setIsToastMessageShow());
  };
  let bgColor = "green";
  switch (toast.severity) {
    case "success":
      bgColor = "green";
      break;
    case "error":
      bgColor = "red";
      break;
    case "info":
      bgColor = "#49AFC2";
      break;
    case "warning":
      bgColor = "orange";
      break;
    default:
      bgColor = "#ffffff";
      break;
  }
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <Close fontSize="small" />
    </IconButton>
  );

  useEffect(() => {
    if (isToastMessageShow) {
      const timeId = setTimeout(() => {
        dispatch(setIsToastMessageShow());
      }, 2000);

      // Return a cleanup function to clear the timeout
      return () => clearTimeout(timeId);
    }
  }, [dispatch, isToastMessageShow]);

  return (
    <Box
      sx={{
        width: 500,
        zIndex: 99999999,
        ".MuiSnackbarContent-root": { backgroundColor: bgColor },
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isToastMessageShow}
        onClose={handleClose}
        message={toast?.message}
        autoHideDuration={3000}
        action={action}
      />
    </Box>
  );
};

export default ToastMessage;
