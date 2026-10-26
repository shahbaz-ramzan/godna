"use client";

import { Avatar, Card, Space, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;

type ParticipantDetails = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

type UsersNameProps = {
  participantDetails?: ParticipantDetails | null;
};

const UsersName = ({ participantDetails }: UsersNameProps) => {
  return (
    <Card className="users-name-card glass-card">
      <div className="un-content">
        <div className="un-header">
          <Title level={2} className="title">
            Named Users
          </Title>
          <Paragraph className="users-descption">
            Invite named users (admins) to your account. Each named user has
            full access based on your plan level.
          </Paragraph>
        </div>

        <Card className="un-inner-card">
          <div className="un-profile flex items-center justify-between gap-4">
            <Space size="middle">
              <Avatar className="un-avatar">
                {participantDetails?.firstName?.charAt(0)}
                {participantDetails?.lastName?.charAt(0)}
              </Avatar>
              <div className="un-user-info">
                <h5>
                  {participantDetails?.firstName} {participantDetails?.lastName}
                </h5>
                <p>{participantDetails?.email}</p>
              </div>
            </Space>
            <Text>Admin</Text>
          </div>
        </Card>

        <Card className="un-inner-card un-inner-bottom-card">
          <p>
            This plan includes 1 Named User (Admin). Upgrade to Professional,
            Small Business, or Enterprise to add more admins and unlock advanced
            features.
          </p>
        </Card>
      </div>
    </Card>
  );
};

export default UsersName;
