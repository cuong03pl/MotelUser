import React, { useState } from "react";
import Modal from "react-modal";
import { CloseIcon } from "../Icon/Icon";
const customStyles = {
  content: {
    top: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function CustomModal({ isOpen, onClose, content }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      overlayClassName="Overlay"
      className="Modal"
      contentLabel="Example Modal"
    >
      {content}
    </Modal>
  );
}
