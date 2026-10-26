import { Button, Modal } from "antd";

interface Props {
  setIsModalOpen: (isModalOpen: boolean) => void;
  isModalOpen: boolean;
  handleLogout: () => void;
}

const WrongPlaceInfoModal = ({
  setIsModalOpen,
  isModalOpen,
  handleLogout,
}: Props) => {
  const handleOk = () => {
    handleLogout();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    handleLogout();
    setIsModalOpen(false);
  };
  return (
    <Modal
      // title="Wrong Credentials"
      open={isModalOpen}
      centered
      onCancel={handleCancel}
      footer={[
        <Button key="okay" type="primary" onClick={handleOk}>
          Okay
        </Button>,
      ]}
    >
      <p>
        Oops - looks like you landed in the wrong place. This is the
        administration view for account holders.
      </p>
    </Modal>
  );
};
export default WrongPlaceInfoModal;
