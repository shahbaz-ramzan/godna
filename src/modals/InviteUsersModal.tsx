import { Button, Form, Input, Modal, Select } from "antd";
import { X } from "lucide-react";
import React, { useState } from "react";

const InviteUsersModal: React.FC = () => {
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
        type="text"
        size="small"
        className="ed-close-modal-btn"
        onClick={showModal}
        icon={<X />}
      />
      <Modal
        open={open}
        title={`Invite User`}
        centered
        className="thm-modal"
        onOk={handleOk}
        okText={"Submit"}
        cancelText={"Cancel"}
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
        <Form layout="vertical" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="firstName" label="First Name" className="mb-0">
              <Input size="large" placeholder="Jane" />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name" className="mb-0">
              <Input size="large" placeholder="Smith" />
            </Form.Item>
          </div>
          <Form.Item name="inviteEmail" label="Email">
            <Input size="large" type="email" placeholder="jane@example.com" />
          </Form.Item>
          <Form.Item name="jobTitle" label="Job Title">
            <Input size="large" placeholder="Product Manager" />
          </Form.Item>
          <Form.Item name="companyName" label="Company">
            <Input size="large" placeholder="Acme Inc." />
          </Form.Item>
          <Form.Item name="assessmentModel" label="Assessment Model">
            <Select
              size="large"
              options={[
                { value: "17q", label: "17Q Quick Discovery" },
                { value: "46q", label: "46Q Full Discovery" },
              ]}
            />
            <p className="caption text-muted-foreground mt-2">
              Full Discovery (46Q) available with Professional or Enterprise
              plan.
            </p>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default InviteUsersModal;
