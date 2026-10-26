import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import { useLoggedPersonName } from "@/hooks/useLoggedPersonName";
import { generateEmail } from "@/lib/utils";
import { submitDigitalScanApi } from "@/network/apis/digitalScan";
import { Form, Input, Modal } from "antd";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { FIELD_LENGTHS } from "@/constants/validations";
import { useAccountId } from "@/hooks/useAccountId";
interface DigitalScanModalProps {
  open?: boolean;
  onClose?: () => void;
  tagId?: number;
}

const DigitalScanModal = ({
  open = false,
  onClose,
  tagId,
}: DigitalScanModalProps) => {
  const [form] = Form.useForm();
  const personId = useLoggedPersonId();
  const loggedPersonName = useLoggedPersonName();
  const accountId = useAccountId();

  useEffect(() => {
    if (loggedPersonName && open) {
      form.setFieldsValue({ adviser: loggedPersonName });
    }
  }, [loggedPersonName, open]);

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const displaySuccessToast = () => {
    toast.success(
      "Your Digital Scan is now in progress. Feel free to continue using the app while we process it in the background.",
      { duration: 10000 },
    );
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const email = generateEmail(values.firstName, values.lastName);
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: "",
        email,
        company: values.company,
        jobTitle: values.jobTitle,
        tagId: tagId,
        accountId: accountId,
        assignedTo: personId,
      };

      submitDigitalScanApi(payload);
      form.resetFields();
      displaySuccessToast();
      onClose();
    } catch {
      console.log("Error submitting digital scan");
    }
  };

  return (
    <Modal
      open={open}
      title="Digital Scan"
      centered
      className="thm-modal ds-modal"
      onCancel={handleCancel}
      cancelText="Cancel"
      okText="Submit"
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
      onOk={handleSubmit}
      footer={(_, { OkBtn, CancelBtn }) => (
        <div className="flex max-sm:justify-center sm:justify-end gap-2">
          <CancelBtn />
          <OkBtn />
        </div>
      )}
    >
      <Form form={form} layout="vertical" className="ds-modal-form">
        <div className="ds-name-wrapper">
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              { required: true, message: "Please enter first name" },
              {
                max: FIELD_LENGTHS.FIRST_NAME,
                message: `First name must be less than ${FIELD_LENGTHS.FIRST_NAME} characters`,
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Jane"
              maxLength={FIELD_LENGTHS.FIRST_NAME}
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input
              size="large"
              placeholder="Smith"
              maxLength={FIELD_LENGTHS.LAST_NAME}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="company"
          label="Company"
          rules={[
            { required: true, message: "Please enter company" },
            {
              max: FIELD_LENGTHS.COMPANY,
              message: `Company must be less than ${FIELD_LENGTHS.COMPANY} characters`,
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Acme Inc."
            maxLength={FIELD_LENGTHS.COMPANY}
          />
        </Form.Item>
        <Form.Item
          name="jobTitle"
          label="Job title"
          rules={[
            { required: true, message: "Please enter job title" },
            {
              max: FIELD_LENGTHS.JOB_TITLE,
              message: `Job title must be less than ${FIELD_LENGTHS.JOB_TITLE} characters`,
            },
          ]}
        >
          <Input
            size="large"
            placeholder="Product Manager"
            maxLength={FIELD_LENGTHS.JOB_TITLE}
          />
        </Form.Item>
        {/* <Form.Item name="adviser" label="Advisor">
          <Select
            size="large"
            placeholder="Select advisor"
            disabled
            options={
              loggedPersonName
                ? [{ value: loggedPersonName, label: loggedPersonName }]
                : []
            }
          />
        </Form.Item>
        <Form.Item
          name="participant"
          label="Tag"
          valuePropName="checked"
          initialValue={true}
        >
          <Checkbox disabled>Participant</Checkbox>
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default DigitalScanModal;
