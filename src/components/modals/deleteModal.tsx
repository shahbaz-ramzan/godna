import { Button, Modal } from "antd";
import { useState } from "react";

import { WarningOutlined } from "@ant-design/icons";

const DeleteModal = ({ type, variant, size, color, icon }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        icon={icon && icon}
        type={type && type}
        variant={variant && variant}
        color={color && color}
        size={size && size}
        onClick={showModal}
        className="!shadow-none"
      >
        {icon ? "" : ""}
      </Button>
      <Modal
        className="modal-wrap thm-delete-modal"
        width={420}
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <div className="modal-footer-wrap">
            <Button size="large" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="large" type="primary" onClick={handleOk} danger>
              Delete
            </Button>
          </div>
        }
      >
        <div className="dm-content">
          <WarningOutlined />
          <p>Are you sure you want to delete the tanant?</p>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;
