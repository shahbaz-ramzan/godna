import { Button, Modal } from "antd";

interface Props {
  accountId: string | null;
  subscriptionUrl?: string;
  subscriptionInfoModalOpen: boolean;
  setSubscriptionInfoModalOpen: (subscriptionInfoModalOpen: boolean) => void;
  handleLogout: () => void;
}

const SubscriptionInfoModal = ({
  handleLogout,
  subscriptionInfoModalOpen,
  setSubscriptionInfoModalOpen,
  accountId,
  subscriptionUrl,
}: Props) => {
  const handleBtnClick = () => {
    setSubscriptionInfoModalOpen(false);
    handleLogout();
  };

  return (
    <Modal
      title="Subscription ended"
      open={subscriptionInfoModalOpen}
      centered
      onCancel={handleBtnClick}
      footer={[
        <Button key="okay" type="primary" onClick={handleBtnClick}>
          Ok
        </Button>,
      ]}
    >
      <p>
        This account, Account #:{accountId}, does not have an active
        subscription.
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li className="text-sm mt-2">
          <a
            href="https://kb.dnabehavior.com/gene/kb-tickets/new"
            target="_blank"
          >
            Submit support ticket
          </a>
        </li>
        <li className="text-sm mt-2">
          <a href={subscriptionUrl} target="_blank">
            Manage subscription
          </a>
        </li>
      </ul>
    </Modal>
  );
};

export default SubscriptionInfoModal;
