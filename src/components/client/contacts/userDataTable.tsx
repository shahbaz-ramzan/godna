"use client";
import { DNASpinner } from "@/components/common/loader";
import ConfirmModal from "@/components/modals/confirmModal";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import DownloadReportModal from "@/modals/downloadReportModal";
import { saveParticipantToAccountApi } from "@/network/apis/user";
import type { TableProps } from "antd";
import { Button, Table, Tooltip, Typography } from "antd";
import { Download, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
const { Text } = Typography;

interface UserDataType {
  personID: string;
  firstName: string;
  lastName: string;
  email: string;
  uniqueStyle: string;
}

interface UserDataTableProps {
  discoveryCompleted: boolean;
  participantsData: {
    pageSize: number;
    userList: UserDataType[];
  };
  tableLoading: boolean;
  accountId: string;
  onUserRemoved?: (accountId: string) => void;
}

const UserDataTable = ({
  discoveryCompleted,
  participantsData,
  tableLoading,
  accountId,
  onUserRemoved = (accountId: string) => {},
}: UserDataTableProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const loggedPersonId = useLoggedPersonId();
  const handleRemoveUser = async () => {
    try {
      setLoading(true);
      const response = await saveParticipantToAccountApi({
        id: 0,
        status: false,
        accountId,
        personId: selectedUser.personID,
        relationship: "S",
        reason: "Removing from account",
        isDefault: false,
      });

      if (response?.data) {
        toast.success("User removed successfully");
        onUserRemoved(accountId);
      }
    } catch (error) {
      console.error("RemoveUser error:", error);
      toast.error("Failed to remove user");
    } finally {
      setLoading(false);
      setIsConfirmOpen(false);
      setSelectedUser(null);
    }
  };

  const columns: TableProps<UserDataType>["columns"] = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "mail",
      key: "mail",
      render: (mail: string) => <Text type="secondary">{mail || "-"}</Text>,
    },
    {
      title: "Unique Style",
      dataIndex: "uniqueStyle",
      key: "uniqueStyle",
      render: (uniqueStyle: string) => (
        <Text type="secondary">{uniqueStyle || "-"}</Text>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: UserDataType) => {
        const isDisabled =
          !discoveryCompleted && record?.personID === loggedPersonId;

        const downloadBtn = (
          <Button
            type="text"
            icon={<Download size={16} />}
            size="small"
            className="action-btn"
            disabled={isDisabled}
            onClick={() => {
              setSelectedUser(record);
              setIsReportOpen(true);
            }}
          />
        );

        return (
          <>
            {isDisabled ? (
              <Tooltip title="Complete discovery to view report">
                <span>{downloadBtn}</span>
              </Tooltip>
            ) : (
              downloadBtn
            )}
            {record?.personID !== loggedPersonId && (
              <Button
                type="text"
                disabled={record?.personID === loggedPersonId}
                danger
                icon={<Trash2 size={16} />}
                size="small"
                className="action-btn"
                onClick={() => {
                  setSelectedUser(record);
                  setIsConfirmOpen(true);
                }}
              />
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ position: "relative" }}>
        <Table
          rowKey="personID"
          columns={columns}
          dataSource={participantsData?.userList || []}
          pagination={false}
          loading={false}
          className="user-data-table thm-table"
          scroll={{ x: "max-content" }}
        />
        {tableLoading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(2px)",
              zIndex: 10,
            }}
          >
            <DNASpinner size={48} />
          </div>
        )}
      </div>

      <ConfirmModal
        open={isConfirmOpen}
        title="Remove Participant"
        description={
          <>
            <p>This action cannot be undone.</p>
            <p>
              Are you sure you want to remove{" "}
              <strong>
                {selectedUser?.firstName} {selectedUser?.lastName}
              </strong>{" "}
              ?
            </p>
          </>
        }
        okText="Delete"
        cancelText="Cancel"
        confirmLoading={loading}
        onConfirm={handleRemoveUser}
        onCancel={() => {
          setIsConfirmOpen(false);
          setSelectedUser(null);
        }}
      />
      <DownloadReportModal
        open={isReportOpen}
        onCancel={() => setIsReportOpen(false)}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default UserDataTable;
