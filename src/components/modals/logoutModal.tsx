import { Button, Modal } from "antd";
import { useState } from "react";

import { WarningOutlined } from "@ant-design/icons";

const LogoutModal = () => {
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
        type="text"
        onClick={showModal}
        className="btn-logout"
        size="small"
      >
        Logout
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
            <Button size="large" type="primary" danger onClick={handleOk}>
              Yes, Logout
            </Button>
          </div>
        }
      >
        <div className="dm-content">
          <WarningOutlined />
          <h5 className="!mb-1">Are you sure you want to logout?</h5>
          <p>You will need to sign in again to access your account.</p>
        </div>
      </Modal>
    </>
  );
};

export default LogoutModal;
