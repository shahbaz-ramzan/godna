import { Button, Form, Select } from "antd";
import { Users } from "lucide-react";

interface UserSelectFormProps {
  firstUser: string;
  secondUser: string;
  handleFirstUserChange: (value: string) => void;
  handleSecondUserChange: (value: string) => void;
  commonSelectProps: any;
  firstUserOptions: any;
  secondUserOptions: any;
  handleCompareStyles: () => void;
  loading: boolean;
}
const UserSelectForm = ({
  firstUser,
  secondUser,
  handleFirstUserChange,
  handleSecondUserChange,
  commonSelectProps,
  firstUserOptions,
  secondUserOptions,
  handleCompareStyles,
  loading,
}: UserSelectFormProps) => {
  return (
    <div className="select-users-wrapper glass-card">
      <h3>Select Users to Compare</h3>

      <Form layout="vertical" variant="filled">
        <div className="select-users-row">
          <Form.Item label="First User" className="select-users-item">
            <Select
              id="user1"
              placeholder="Select first user"
              value={firstUser}
              onChange={handleFirstUserChange}
              {...commonSelectProps(firstUserOptions)}
            />
          </Form.Item>

          <Form.Item label="Second User" className="select-users-item">
            <Select
              id="user2"
              placeholder="Select second user"
              value={secondUser}
              onChange={handleSecondUserChange}
              {...commonSelectProps(secondUserOptions)}
            />
          </Form.Item>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="thm-btn"
            icon={<Users className="mr-2 h-5 w-5" />}
            onClick={handleCompareStyles}
            loading={loading}
            disabled={!firstUser || !secondUser}
          >
            Compare Styles
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserSelectForm;
