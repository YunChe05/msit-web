import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FC, useState } from "react";

type BasicModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  height?: number;
};
export const BasicModal: FC<BasicModalProps> = ({
  isOpen,
  onClose,
  height = 500,
  width = 500,
  children,
}) => {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white border-2 border-solid border-black shadow-md p-4`}
        >
          {children as React.ReactElement}
        </div>
      </Modal>
    </div>
  );
};
