import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { FC } from "react";

type BasicModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const BasicModal: FC<BasicModalProps> = ({
  isOpen,
  onClose,
  width = 500,
  children,
}) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children as React.ReactElement}</Box>
      </Modal>
    </div>
  );
};
