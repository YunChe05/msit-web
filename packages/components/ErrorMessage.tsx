import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";

type ErrorMessageProps = { isError: boolean; message: string };

export const ErrorMessage = ({ isError, message }: ErrorMessageProps) => {
  return (
    <>
      {isError && (
        <Typography variant="caption" color="red">
          {message}
        </Typography>
      )}
    </>
  );
};
