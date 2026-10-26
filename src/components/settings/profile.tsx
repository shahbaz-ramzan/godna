"use client";

import { STORAGE_KEYS } from "@/constants/localStorageKeys";
import { FIELD_LENGTHS } from "@/constants/validations";
import { defaultInitial, FieldType, isSameValues } from "@/lib/utils";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/localStorage";
import { Button, Form, Input, Typography } from "antd";
import { useEffect, useRef } from "react";

const { Title } = Typography;

type ParticipantDetails = {
  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
};

type ProfileProps = {
  participantDetails?: ParticipantDetails | null;
  onParticipantDataChange?: (data: ParticipantDetails) => void;
  onSubmit?: (values: FieldType) => Promise<void>;
  isSubmitting?: boolean;
};

const Profile = ({
  participantDetails,
  onParticipantDataChange,
  onSubmit,
  isSubmitting = false,
}: ProfileProps) => {
  const [form] = Form.useForm<FieldType>();
  const initialValuesRef = useRef<FieldType>(defaultInitial);
  const currentValues = Form.useWatch([], form);
  const hasFormChanges = currentValues
    ? !isSameValues(currentValues, initialValuesRef.current)
    : false;

  useEffect(() => {
    setInitialValues(participantDetails);
  }, [participantDetails]);

  const setInitialValues = (firstParticipant: ParticipantDetails) => {
    const initial: FieldType = {
      firstname: firstParticipant?.firstName,
      lastname: firstParticipant?.lastName,
      email: firstParticipant?.email,
      companyName: firstParticipant?.companyName ?? "",
    };
    initialValuesRef.current = initial;
    form.setFieldsValue(initial);
    onParticipantDataChange(firstParticipant);
  };

  const onFinish = async (values: FieldType) => {
    await onSubmit(values);
    updateLocalStorage(values);
    onParticipantDataChange({
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      companyName: values.companyName,
    });
  };

  const updateLocalStorage = (values: FieldType) => {
    const existing = JSON.parse(
      getLocalStorageItem(STORAGE_KEYS.PARTICIPANT_DETAILS) || "{}",
    );

    const updated = {
      ...existing,
      firstName: values.firstname ?? existing.firstName,
      lastName: values.lastname ?? existing.lastName,
      email: values.email ?? existing.email,
      companyName: values.companyName ?? existing.companyName,
    };

    setLocalStorageItem(
      STORAGE_KEYS.PARTICIPANT_DETAILS,
      JSON.stringify(updated),
    );

    setLocalStorageItem(
      STORAGE_KEYS.LOGGED_PERSON_NAME,
      `${values.firstname ?? ""} ${values.lastname ?? ""}`.trim(),
    );
  };
  return (
    <div className="profile-card glass-card p-8">
      <Title level={2} className="title">
        Profile Information
      </Title>
      <Form<FieldType>
        form={form}
        layout="vertical"
        className="thm-form profile-form"
        onFinish={onFinish}
      >
        <div className="pf-grid-box grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="firstname"
            label="First name"
            rules={[
              { required: true, message: "First name is required" },
              {
                max: FIELD_LENGTHS.FIRST_NAME,
                message: `First name must be less than ${FIELD_LENGTHS.FIRST_NAME} characters`,
              },
            ]}
          >
            <Input size="large" maxLength={FIELD_LENGTHS.FIRST_NAME} />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last name"
            rules={[
              { required: true, message: "Last name is required" },
              {
                max: FIELD_LENGTHS.LAST_NAME,
                message: `Last name must be less than ${FIELD_LENGTHS.LAST_NAME} characters`,
              },
            ]}
          >
            <Input size="large" maxLength={FIELD_LENGTHS.LAST_NAME} />
          </Form.Item>
        </div>
        <Form.Item name="email" label="Email">
          <Input
            size="large"
            type="email"
            disabled
            maxLength={FIELD_LENGTHS.EMAIL}
          />
        </Form.Item>
        <Form.Item
          name="companyName"
          label="Company"
          rules={[
            {
              max: FIELD_LENGTHS.COMPANY,
              message: `Company must be less than ${FIELD_LENGTHS.COMPANY} characters`,
            },
          ]}
        >
          <Input size="large" maxLength={FIELD_LENGTHS.COMPANY} />
        </Form.Item>
        <Button
          type="primary"
          size="small"
          htmlType="submit"
          disabled={!hasFormChanges}
          className="thm-btn save-btn"
          loading={isSubmitting}
        >
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default Profile;
