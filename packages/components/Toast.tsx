import { Alert, Snackbar } from "@mui/material";

type ToastProps = {
  message?: string;
  isOpen?: boolean;
  type: "error" | "warning" | "info" | "success";
  handleClose?: () => void;
};

export const Toast = ({
  type,
  handleClose,
  isOpen = false,
  message = type,
}: ToastProps) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
