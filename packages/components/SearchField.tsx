import { IconButton, InputBase, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";

type SearchFieldProps = {
  text?: string;
  placeHolder?: string;
  handleCloseButton?: () => void;
  handleChangeText?: (text?: string) => void;
};
export const SearchField = ({
  text = "",
  handleChangeText,
  handleCloseButton,
  placeHolder = "Search",
}: SearchFieldProps) => {
  return (
    <Paper
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        value={text}
        placeholder={placeHolder}
        onChange={(event) => handleChangeText?.(event?.target?.value)}
      />
      {text.length !== 0 && (
        <IconButton
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleCloseButton}
        >
          <Close />
        </IconButton>
      )}
    </Paper>
  );
};
