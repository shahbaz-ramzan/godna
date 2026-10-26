import { FIELD_LENGTHS } from "@/constants/validations";
import { Button, Form, Input, Progress } from "antd";
import { Check, Eye, EyeOff, X } from "lucide-react";
interface PasswordStepProps {
  passwordValue: string;
  strength: { score: number; label: string };
  strengthPercent: number;
  strengthColor: string | { "0%": string; "100%": string };
  passwordChecks: {
    length: boolean;
    number: boolean;
    symbol: boolean;
    uppercase: boolean;
  };
  isLoading?: boolean;
}

const renderPasswordVisibilityIcon = (visible: boolean) =>
  visible ? <Eye /> : <EyeOff />;
function PasswordStep({
  passwordValue,
  strength,
  strengthPercent,
  strengthColor,
  passwordChecks,
  isLoading = false,
}: Readonly<PasswordStepProps>) {
  const isStrongPassword =
    passwordChecks.length &&
    passwordChecks.number &&
    passwordChecks.symbol &&
    passwordChecks.uppercase;

  return (
    <div className="password-wrapper">
      <Form.Item
        name="password"
        label="Password *"
        rules={[
          {
            required: true,
            message: "Please enter your password!",
          },
          {
            max: FIELD_LENGTHS.PASSWORD,
            message: `Password must be less than ${FIELD_LENGTHS.PASSWORD} characters!`,
          },
        ]}
      >
        <Input.Password
          size="large"
          placeholder="Enter your password"
          maxLength={FIELD_LENGTHS.PASSWORD}
          iconRender={renderPasswordVisibilityIcon}
        />
      </Form.Item>
      {passwordValue && (
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
        label="Confirm Password *"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          {
            max: FIELD_LENGTHS.CONFIRM_PASSWORD,
            message: `Confirm password must be less than ${FIELD_LENGTHS.CONFIRM_PASSWORD} characters!`,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match."));
            },
          }),
        ]}
      >
        <Input.Password
          size="large"
          placeholder="Re-enter your password"
          maxLength={FIELD_LENGTHS.CONFIRM_PASSWORD}
          iconRender={renderPasswordVisibilityIcon}
        />
      </Form.Item>

      <div className="password-checks-wrapper">
        <p className="pc-label">Password must contain:</p>
        <ul className="pc-list">
          <li
            className={`${
              passwordChecks.length ? "text-green-500" : "text-muted-foreground"
            }`}
          >
            {passwordChecks.length ? (
              <Check className="icon" />
            ) : (
              <X className="icon" />
            )}
            <span>At least 8 characters</span>
          </li>
          <li
            className={`${
              passwordChecks.number ? "text-green-500" : "text-muted-foreground"
            }`}
          >
            {passwordChecks.number ? (
              <Check className="icon" />
            ) : (
              <X className="icon" />
            )}
            <span className="pc-requirement">One number</span>
          </li>
          <li
            className={`${
              passwordChecks.symbol ? "text-green-500" : "text-muted-foreground"
            }`}
          >
            {passwordChecks.symbol ? (
              <Check className="icon" />
            ) : (
              <X className="icon" />
            )}
            <span>One symbol (!@#$%^&*)</span>
          </li>
          <li
            className={`${
              passwordChecks.uppercase
                ? "text-green-500"
                : "text-muted-foreground"
            }`}
          >
            {passwordChecks.uppercase ? (
              <Check className="icon" />
            ) : (
              <X className="icon" />
            )}
            <span>One uppercase letter</span>
          </li>
        </ul>
      </div>

      <Form.Item>
        <Button
          className="thm-btn"
          block
          htmlType="submit"
          disabled={!isStrongPassword}
          loading={isLoading}
        >
          Create Account
        </Button>
      </Form.Item>
    </div>
  );
}

export default PasswordStep;
