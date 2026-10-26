"use client";
import UsersExpressionDrawer from "@/components/client/contacts/usersExpressionDrawer";
import { DNASpinner } from "@/components/common/loader";
import { useAccountId } from "@/hooks/useAccountId";
import { useDiscoveryStatus } from "@/hooks/useDiscoveryStatus";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import DownloadReportModal from "@/modals/downloadReportModal";
import { searchParticipantByAccountApi } from "@/network/apis/user";
import type { TableProps } from "antd";
import { Button, Card, Input, Table, Tooltip, Typography } from "antd";
import { Download, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MOOD_COLOR_MAP,
  MOOD_FILTERS,
  MOOD_LABEL_MAP,
  type MarketMoodUser,
} from "./marketMoodTypes";

const { Text } = Typography;

const DEBOUNCE_MS = 300;

// ─── Sub-components ───────────────────────────────────────────────────────────

const MoodPill = ({ mood, colorKey }: { mood: string; colorKey?: string }) => {
  const hex = MOOD_COLOR_MAP[colorKey ?? ""] ?? "#000";
  return (
    <span
      className="mood-pill"
      style={{
        backgroundColor: `${hex}20`,
        borderColor: `${hex}60`,
        color: hex,
      }}
    >
      {mood}
    </span>
  );
};

const TableLoader = () => (
  <div className="mm-table-loader-overlay">
    <DNASpinner size={48} />
  </div>
);

const DownloadReportButton = ({
  disabled,
  onClick,
}: {
  disabled: boolean;
  onClick: () => void;
}) => {
  const button = (
    <Button
      type="text"
      icon={<Download size={16} />}
      size="small"
      className="action-btn"
      disabled={disabled}
      onClick={onClick}
    />
  );

  if (!disabled) return button;

  return (
    <Tooltip title="Complete discovery to view report">
      <span>{button}</span>
    </Tooltip>
  );
};

// ─── Column definitions (stable — defined outside component) ──────────────────

const columns: TableProps<MarketMoodUser>["columns"] = [
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
    title: "Unique Style",
    dataIndex: "uniqueStyle",
    key: "uniqueStyle",
    render: (val: string) => <Text type="secondary">{val || "-"}</Text>,
  },
  {
    title: "Market Mood",
    key: "marketMood",
    render: (_: unknown, record: MarketMoodUser) =>
      record.mood ? (
        <MoodPill
          mood={MOOD_LABEL_MAP[record.color ?? ""] ?? record.mood}
          colorKey={record.color}
        />
      ) : (
        <Text type="secondary">-</Text>
      ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

interface MarketMoodTableProps {
  activeFilter: string;
  onFilterChange: (colorKey: string) => void;
}

const MarketMoodTable = ({
  activeFilter,
  onFilterChange,
}: MarketMoodTableProps) => {
  const accountId = useAccountId();
  const { completed: discoveryCompleted } = useDiscoveryStatus();
  const loggedPersonId = useLoggedPersonId();
  const [participants, setParticipants] = useState<MarketMoodUser[]>([]);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<MarketMoodUser | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestCallRef = useRef(0);

  const fetchParticipants = useCallback(
    async (accountId: string, searchText?: string) => {
      const callId = ++latestCallRef.current;
      try {
        setTableLoading(true);
        const response = await searchParticipantByAccountApi({
          accountId,
          pageNumber: 1,
          pageSize: 10,
          ...(searchText?.trim() && { search: searchText.trim() }),
        });
        if (callId === latestCallRef.current) {
          setParticipants(response?.data?.userList ?? []);
        }
      } catch (error) {
        console.error("fetchParticipants error:", error);
      } finally {
        if (callId === latestCallRef.current) setTableLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (accountId) fetchParticipants(accountId);
  }, [accountId]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (accountId) fetchParticipants(accountId, value);
    }, DEBOUNCE_MS);
  };

  // Client-side mood filter on top of server-side search results
  const filtered = useMemo(
    () =>
      participants.filter(
        (u) => activeFilter === "all" || u.color === activeFilter,
      ),
    [participants, activeFilter],
  );

  const actionColumn: TableProps<MarketMoodUser>["columns"] = useMemo(
    () => [
      ...columns,
      {
        title: "Actions",
        key: "actions",
        render: (_: unknown, record: MarketMoodUser) => (
          <DownloadReportButton
            disabled={
              !discoveryCompleted && record?.personID === loggedPersonId
            }
            onClick={() => {
              setSelectedUser(record);
              setIsReportOpen(true);
            }}
          />
        ),
      },
    ],
    [discoveryCompleted, loggedPersonId],
  );

  return (
    <Card className="market-mood-table-card">
      <div className="mmt-toolbar">
        <div className="mmt-filters">
          {MOOD_FILTERS.map((f) => {
            const isActive = activeFilter === f.key;
            const activeBg = f.color ?? "#2a3b4d";
            return (
              <button
                key={f.key}
                className={`mmt-filter-btn${isActive ? " active" : ""}`}
                onClick={() => onFilterChange(f.key)}
                style={
                  isActive
                    ? {
                        backgroundColor: activeBg,
                        borderColor: activeBg,
                        color: "#fff",
                      }
                    : undefined
                }
              >
                {f.color && (
                  <span
                    className="mmt-filter-dot"
                    style={{ backgroundColor: f.color }}
                  />
                )}
                {f.label}
              </button>
            );
          })}
        </div>
        <Input
          placeholder="Search users..."
          prefix={<Search size={14} className="text-gray-400" />}
          value={search}
          onChange={handleSearchChange}
          className="mmt-search"
          allowClear
        />
      </div>

      <div style={{ position: "relative" }}>
        <Table
          rowKey="personID"
          columns={actionColumn}
          dataSource={filtered}
          pagination={false}
          loading={false}
          className="user-data-table thm-table"
        />
        {tableLoading && <TableLoader />}
      </div>

      <UsersExpressionDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <DownloadReportModal
        open={isReportOpen}
        onCancel={() => setIsReportOpen(false)}
        selectedUser={selectedUser}
      />
    </Card>
  );
};

export default MarketMoodTable;
