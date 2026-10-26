import { Card, Drawer, Tag } from "antd";
import React from "react";

interface UsersExpressionDrawerProps {
  open: boolean;
  onClose: () => void;
}

const UsersExpressionDrawer: React.FC<UsersExpressionDrawerProps> = ({
  open,
  onClose,
}) => {
  return (
    <Drawer
      title={
        <div className="title-wrapper">
          <h2>
            <div className="status-indicator bg-primary" />
            Good Mood
          </h2>
          <p>2 people (40%)</p>
        </div>
      }
      closable={{ placement: "end" }}
      onClose={onClose}
      open={open}
      rootClassName="users-expression-drawer"
      className="users-expression-section"
    >
      <div className="ue-drawer-content">
        <Card className="ue-drawer-card">
          <div className="ue-card-header">
            <div>
              <h3>John Doe</h3>
              <p>john@example.com</p>
            </div>
            <Tag className="ue-card-tag">Good</Tag>
          </div>
          <p className="ue-completed text-success">✓ Discovery Completed</p>
          <p className="us-last-active text-muted-foreground">
            Last active: 2 hours ago
          </p>
        </Card>
        <Card className="ue-drawer-card">
          <div className="ue-card-header">
            <div>
              <h3>John Doe</h3>
              <p>john@example.com</p>
            </div>
            <Tag className="ue-card-tag">Good</Tag>
          </div>
          <p className="ue-completed text-success">✓ Discovery Completed</p>
          <p className="us-last-active text-muted-foreground">
            Last active: 2 hours ago
          </p>
        </Card>
      </div>
    </Drawer>
  );
};

export default UsersExpressionDrawer;
