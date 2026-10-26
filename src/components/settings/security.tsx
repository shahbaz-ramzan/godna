"use client";

import { FIELD_LENGTHS } from "@/constants/validations";
import { getPasswordStrength, getStrengthColor } from "@/lib/utils";
import { changePasswordApi } from "@/network/apis/setting";
import { Button, Form, Input, Progress, Typography } from "antd";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
const { Title } = Typography;

type PasswordFields = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

const Security = () => {
  const [form] = Form.useForm<PasswordFields>();
  const [loading, setLoading] = useState(false);

  const newPasswordValue = Form.useWatch("newPassword", form);
  const strength = getPasswordStrength(newPasswordValue);
  const strengthPercent = strength.percent;
  const strengthColor = getStrengthColor(strength.label);

  const handleChangePassword = async (values: PasswordFields) => {
    const { currentPassword, newPassword, confirmPassword } = values;
    const payload = {
      oldPassword: currentPassword,
      newPassword,
      confirmPassword,
    };
    try {
      setLoading(true);
      const response: any = await changePasswordApi(payload);
      if (!response?.errors) {
        toast.success(response?.message);
        form.resetFields();
      } else {
        toast.error(response?.errors?.debugMessage);
      }
    } catch (error) {
      console.error("Failed to change password", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="security-card glass-card p-8 space-y-6">
      <Title level={2} className="title">
        Change Password
      </Title>

      <div className="security-content">
        <div className="security-item">
          <Form<PasswordFields>
            form={form}
            layout="vertical"
            onFinish={handleChangePassword}
            className="thm-form security-form"
          >
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password",
                },
              ]}
            >
              <Input.Password
                size="large"
                iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
              />
            </Form.Item>

            <Form.Item
              name="newPassword"
              label="New Password"
              validateTrigger="onChange"
              dependencies={["currentPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please enter a new password",
                },
                {
                  max: FIELD_LENGTHS.PASSWORD,
                  message: `Password must be less than ${FIELD_LENGTHS.PASSWORD} characters!`,
                },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const passwordStrength = getPasswordStrength(value);
                    if (passwordStrength.label === "Strong")
                      return Promise.resolve();
                    return Promise.reject(
                      new Error("Please enter a strong password"),
                    );
                  },
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("currentPassword") !== value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "New password must be different from your current password",
                      ),
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                maxLength={FIELD_LENGTHS.PASSWORD}
                iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
              />
            </Form.Item>
            {newPasswordValue && (
              <div className="progress-bar-wrapper">
                <div className="pb-text">
                  <span className="pb-label">Password strength:</span>
                  <span className="text-xs">{strength.label}</span>
                </div>
                <Progress
                  percent={strengthPercent}
                  showInfo={false}
                  strokeColor={strengthColor}
                />
              </div>
            )}

            <Form.Item
              name="confirmPassword"
              label="Confirm New Password"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Please confirm your new password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                iconRender={(visible) => (visible ? <Eye /> : <EyeOff />)}
              />
            </Form.Item>

            <Button
              className="thm-btn update-btn"
              size="small"
              htmlType="submit"
              loading={loading}
              disabled={strength.label !== "Strong"}
            >
              Update Password
            </Button>
          </Form>
        </div>

        {/* <div className="security-item two-fa-item">
          <Title level={4} className="si-title">
            Two-Factor Authentication (2FA)
          </Title>
          <Paragraph className="si-description">
            Add an extra layer of protection by enabling two-factor
            authentication on your account.
          </Paragraph>
          <div className="two-fa-wrapper">
            <div className="fa-info">
              <Title level={5} className="fa-title">
                Enable Two-Factor Authentication
              </Title>
              <Text className="fa-description">
                Require a verification code in addition to your password
              </Text>
            </div>
            <Switch checked={twoFactorEnabled} onChange={setTwoFactorEnabled} size="small" className="thm-switch" />
          </div>
        </div> */}

        {/* <div className="security-item danger-zone-item">
          <Title level={4} className="si-title">
            Danger Zone
          </Title>
          <div className="danger-zone-wrapper">
            <div className="dz-info">
              <Title level={5} className="dz-title">
                Delete Account
              </Title>
              <Text className="dz-description">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </Text>
            </div>
            <AccountDeleteModal />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Security;
