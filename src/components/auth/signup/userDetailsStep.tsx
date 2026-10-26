import { PRIVACY_POLICY, TERMS_OF_SERVICE } from "@/constants/urls";
import { FIELD_LENGTHS, PATTERNS } from "@/constants/validations";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import Link from "next/link";

interface UserDetailsStepProps {
  onFinish: () => void;
}

function UserDetailsStep({ onFinish }: Readonly<UserDetailsStepProps>) {
  return (
    <div className="transition-all duration-300 ease-in-out">
      <Row gutter={[16, 0]}>
        <Col md={12} span={24}>
          <Form.Item
            name="firstName"
            label="First name *"
            rules={[
              {
                required: true,
                message: "Please enter your first name!",
              },
              {
                pattern: PATTERNS.ALL_WITHOUT_SPECIAL,
                message: "First name must not contain special characters!",
              },
              {
                max: FIELD_LENGTHS.FIRST_NAME,
                message: `First name must be less than ${FIELD_LENGTHS.FIRST_NAME} characters!`,
              },
            ]}
          >
            <Input
              size="large"
              placeholder="John"
              maxLength={FIELD_LENGTHS.FIRST_NAME}
            />
          </Form.Item>
        </Col>
        <Col md={12} span={24}>
          <Form.Item
            name="lastName"
            label="Last name *"
            rules={[
              {
                required: true,
                message: "Please enter your last name!",
              },
              {
                pattern: PATTERNS.ALL_WITHOUT_SPECIAL,
                message: "Last name must not contain special characters!",
              },
              {
                max: FIELD_LENGTHS.LAST_NAME,
                message: `Last name must be less than ${FIELD_LENGTHS.LAST_NAME} characters!`,
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Doe"
              maxLength={FIELD_LENGTHS.LAST_NAME}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="email"
        label="Email *"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Please enter a valid email address!" },
          {
            max: FIELD_LENGTHS.EMAIL,
            message: `Email must be less than ${FIELD_LENGTHS.EMAIL} characters!`,
          },
        ]}
      >
        <Input
          size="large"
          placeholder="john@example.com"
          maxLength={FIELD_LENGTHS.EMAIL}
        />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[
          {
            pattern: PATTERNS.DIGITS_ONLY,
            message: "Phone number must contain digits only",
          },
          {
            max: FIELD_LENGTHS.PHONE_NUMBER,
            message: `Phone number must be less than ${FIELD_LENGTHS.PHONE_NUMBER} digits`,
          },
        ]}
      >
        <Input
          size="large"
          placeholder="Enter your phone number"
          maxLength={FIELD_LENGTHS.PHONE_NUMBER}
          inputMode="numeric"
        />
      </Form.Item>

      <Form.Item
        name="company"
        label="Company"
        rules={[
          {
            pattern: PATTERNS.INDUSTRY,
            message: "Company must contain only letters, numbers, and spaces!",
          },
          {
            max: FIELD_LENGTHS.COMPANY,
            message: `Company must be less than ${FIELD_LENGTHS.COMPANY} characters!`,
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
        name="terms"
        valuePropName="checked"
        className="checkbox-wrapper mb-0"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    new Error(
                      "You must accept Terms of Service and Privacy Policy",
                    ),
                  ),
          },
        ]}
      >
        <Checkbox>
          I agree to the{" "}
          <Link
            href={TERMS_OF_SERVICE}
            target="_blank"
            rel="noopener noreferrer"
            className="check-link"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={PRIVACY_POLICY}
            target="_blank"
            rel="noopener noreferrer"
            className="check-link"
          >
            Privacy Policy
          </Link>
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button className="thm-btn" block onClick={onFinish}>
          Next
        </Button>
      </Form.Item>
      <p className="form-next-text text-center text-[#7A7A7A] text-xs mb-0">
        You'll set your password in the next step.
      </p>

      <p className="form-next-text text-center text-[#7A7A7A] text-xs mt-1! mb-0">
        Already have an account?{" "}
        <Link href="/login" className="text-blue font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
}

export default UserDetailsStep;
