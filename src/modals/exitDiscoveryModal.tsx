import { Routes } from "@/constants/routes";
import { Button, Modal } from "antd";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ExitDiscoveryModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  useEffect(() => {
    router.prefetch(Routes.DNA_DISCOVERY);
  }, [router]);

  const handleCancel = () => {
    router.push(Routes.DNA_DISCOVERY);
    setOpen(false);
  };
  return (
    <>
      <Button
        type="text"
        size="small"
        className="ed-close-modal-btn"
        onClick={showModal}
        icon={<X />}
      />
      <Modal
        open={open}
        title={`Exit Discovery?`}
        centered
        className="thm-modal"
        onOk={handleOk}
        okText={"Continue Assessment"}
        cancelText={"Exit"}
        cancelButtonProps={{
          type: "primary",
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
            <OkBtn />
            <CancelBtn />
          </>
        )}
      >
        <p className="modal-text">
          Your progress will be saved, and you can continue later from where you
          left off.
        </p>
      </Modal>
    </>
  );
};

export default ExitDiscoveryModal;
