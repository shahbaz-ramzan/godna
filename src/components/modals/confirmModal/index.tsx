"use client";

import { Modal } from "antd";
import { ReactNode } from "react";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: ReactNode;
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  open,
  title = "Are you sure?",
  description,
  okText = "Confirm",
  cancelText = "Cancel",
  confirmLoading = false,
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <Modal
      open={open}
      title={title}
      onOk={onConfirm}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      confirmLoading={confirmLoading}
      className={`thm-modal ${danger ? "confirm-danger-modal" : ""}`}
      okButtonProps={{
        type: "default",
        danger: false,
        className: "cancel-btn",
        size: "small",
      }}
      cancelButtonProps={{
        type: "default",
        className: "ok-btn",
        size: "small",
      }}
      centered
      destroyOnHidden
    >
      {description}
    </Modal>
  );
};

export default ConfirmModal;
