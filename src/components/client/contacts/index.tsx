"use client";
import ClientDashboardHeader from "@/components/common/clientDashboardHeader/clientDashboardHeader";
import { Routes } from "@/constants/routes";
import { useAccountId } from "@/hooks/useAccountId";
import { useDiscoveryStatus } from "@/hooks/useDiscoveryStatus";
import DigitalScanModal from "@/modals/digitalScanModal";
import { getTagsApi, searchParticipantByAccountApi } from "@/network/apis/user";
import { Maximize } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import UserDataTable from "./userDataTable";

const Contacts = () => {
  const [participantsData, setParticipantsData] = useState<any>({});
  const [tableLoading, setTableLoading] = useState(false);
  const [digitalScanModalOpen, setDigitalScanModalOpen] = useState(false);
  const [tagId, setTagId] = useState(null);
  const accountId = useAccountId();
  const { completed } = useDiscoveryStatus();
  const router = useRouter();
  const searchParams = useSearchParams();
  const scanTriggered = useRef(false);

  useEffect(() => {
    if (accountId) {
      fetchParticipants(accountId);
      getTags(accountId);
    }
  }, [accountId]);

  useEffect(() => {
    if (scanTriggered.current) return;
    if (searchParams.get("openScan") === "true") {
      scanTriggered.current = true;
      setDigitalScanModalOpen(true);
      router.replace(Routes.CONTACTS);
    }
  }, [searchParams, router]);

  const fetchParticipants = async (accountId: string) => {
    try {
      setTableLoading(true);
      const response = await searchParticipantByAccountApi({
        accountId,
        pageNumber: 1,
        pageSize: 10,
      });
      if (response?.data) {
        setParticipantsData(response?.data);
      }
    } catch (error) {
      console.error("SearchParticipantByAccount error:", error);
    } finally {
      setTableLoading(false);
    }
  };

  const getTags = async (accountId: string) => {
    try {
      const response = await getTagsApi(accountId);
      if (response?.data) {
        setTagId(response?.data?.[0]?.tagId ?? null);
      }
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  return (
    <>
      <ClientDashboardHeader
        title="Contacts"
        description=""
        showBtn={true}
        primaryLabel="Digital Scan"
        primaryIcon={<Maximize />}
        primaryBtnClass="header-btn-primary"
        primaryOnClick={() => setDigitalScanModalOpen(true)}
      />
      <DigitalScanModal
        open={digitalScanModalOpen}
        tagId={tagId}
        onClose={() => setDigitalScanModalOpen(false)}
      />
      <UserDataTable
        discoveryCompleted={completed}
        participantsData={participantsData}
        tableLoading={tableLoading}
        accountId={accountId}
        onUserRemoved={() => fetchParticipants(accountId)}
      />
    </>
  );
};

export default Contacts;
