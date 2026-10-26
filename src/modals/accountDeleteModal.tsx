import { Button, Modal } from "antd";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

const AccountDeleteModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        variant="solid"
        color="danger"
        size="small"
        className="danger-btn"
        onClick={showModal}
        icon={<Trash2 className="h-4 w-4" />}
      >
        Delete Account
      </Button>
      <Modal
        open={open}
        title={`Delete Account?`}
        centered
        className="thm-modal account-delete-modal"
        onOk={handleOk}
        okText={"Delete My Account"}
        cancelText={"Cancel"}
        cancelButtonProps={{
          type: "default",
          className: "cancel-btn",
          size: "small",
        }}
        okButtonProps={{
          type: "default",
          className: "ok-btn",
          size: "small",
        }}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <div className="modal-text">
          <p className="modal-descp">
            This will permanently delete your account and all associated data,
            including:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Your Discovery results and reports</li>
            <li>GeneAI chat history</li>
            <li>Market Mood data</li>
            <li>All subscription information</li>
          </ul>
          <p className="mt-4">This action cannot be undone.</p>
        </div>
      </Modal>
    </>
  );
};

export default AccountDeleteModal;
