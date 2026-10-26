"use client";
import ClientDashboardHeader from "@/components/common/clientDashboardHeader/clientDashboardHeader";
import { useAccountId } from "@/hooks/useAccountId";
import { useDiscoveryStatus } from "@/hooks/useDiscoveryStatus";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import {
  getMarketDataApi,
  getMarketMoodArrayApi,
  getMarketMoodPercentApi,
} from "@/network/apis/report";
import { useEffect, useState } from "react";
import MarketChart from "./marketChart";
import MarketMoodTable from "./marketMoodTable";
import MoodDonut from "./moodDonut";

const MarketMood = () => {
  const [marketMoodPercent, setMarketMoodPercent] = useState<any>(null);
  const [marketData, setMarketData] = useState<any>(null);
  const [marketMoodArray, setMarketMoodArray] = useState<any>(null);
  const [loadingPercent, setLoadingPercent] = useState(false);
  const [loadingMarketData, setLoadingMarketData] = useState(false);
  // Shared between the donut (click a slice/legend row) and the table below
  // (its filter pills), so both views stay in sync — "all" | mood colorKey
  const [moodFilter, setMoodFilter] = useState<string>("all");
  const accountId = useAccountId();
  const personId = useLoggedPersonId();
  const { completed: discoveryCompleted } = useDiscoveryStatus();

  const toggleMoodFilter = (colorKey: string) =>
    setMoodFilter((prev) => (prev === colorKey ? "all" : colorKey));

  const getTrackedUsersCount = () =>
    Array.isArray(marketMoodPercent)
      ? marketMoodPercent.reduce((sum, e) => sum + (e.count ?? 0), 0)
      : 0;

  const trackedUsersCount = getTrackedUsersCount();

  useEffect(() => {
    if (accountId) fetchMarketMoodPercent(accountId);
  }, [accountId]);

  useEffect(() => {
    // GetMarketMoodArray needs this user's own behavior-type data, same as
    // GetUniqueStyleAndDescription — skip it until discovery is completed,
    // otherwise it 400s (matches the DiscoveryGuard used on report/style-match).
    if (personId && discoveryCompleted) fetchMarketMoodArray(personId);
  }, [personId, discoveryCompleted]);

  useEffect(() => {
    fetchMarketData();
  }, []);

  const fetchMarketMoodArray = async (pid: string) => {
    try {
      const formattedDate = new Date().toLocaleDateString("en-CA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const response: any = await getMarketMoodArrayApi(
        pid,
        null as any,
        formattedDate,
      );
      if (response?.data) setMarketMoodArray(response.data);
    } catch {}
  };

  const fetchMarketData = async () => {
    setLoadingMarketData(true);
    try {
      const response: any = await getMarketDataApi(1);
      if (response?.data) setMarketData(response.data);
    } catch {
    } finally {
      setLoadingMarketData(false);
    }
  };

  const fetchMarketMoodPercent = async (aid: string) => {
    setLoadingPercent(true);
    try {
      const response: any = await getMarketMoodPercentApi(aid);
      if (Array.isArray(response?.data)) setMarketMoodPercent(response.data);
    } catch {
    } finally {
      setLoadingPercent(false);
    }
  };

  return (
    <>
      <ClientDashboardHeader
        title="Market Mood"
        description="A behavioral pulse on the sentiment shaping today's market."
        showBtn={false}
      />

      <div className="mm-overview-card">
        {trackedUsersCount > 0 && (
          <div className="mm-meta-row">
            <span className="mm-tracked-badge">
              {trackedUsersCount} Users Tracked
            </span>
          </div>
        )}

        <div className="mm-main-grid">
          <MoodDonut
            loading={loadingPercent}
            moodData={marketMoodPercent}
            activeFilter={moodFilter}
            onFilterChange={toggleMoodFilter}
          />
          <MarketChart
            loading={loadingMarketData}
            marketMoodData={marketData?.marketMoodData}
            marketMoodLabels={marketData?.marketMoodLabels}
            marketMood={marketMoodArray?.mood}
            marketMoodColor={marketMoodArray?.color}
          />
        </div>
      </div>
      <MarketMoodTable
        activeFilter={moodFilter}
        onFilterChange={setMoodFilter}
      />
    </>
  );
};

export default MarketMood;
