"use client";

import ClientDashboardHeader from "@/components/common/clientDashboardHeader/clientDashboardHeader";
import FullScreenLoader from "@/components/common/loader";
import UnLockCommunityCard from "@/components/common/unLockCommunityCard";
import { useAccountId } from "@/hooks/useAccountId";
import {
  getParticipantDetailsApi,
  searchParticipantByAccountApi,
} from "@/network/apis/user";
import {
  fetchBDNA5ScoresData,
  fetchCommunicationInsightsData,
  fetchPerformanceGuideData,
  fetchStyleComparisonData,
  fetchStyleMatchData,
} from "@/network/services/styleComparison.service";
import { Spin } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import ComparisonStyleMatchTabs from "./comparisonStyleMatchTabs";
import UserSelectForm from "./userSelectForm";

const DEBOUNCE_MS = 300;

interface UserOption {
  value: string;
  label: string;
  role: string;
}

const StyleMatch: React.FC = () => {
  const accountId = useAccountId();
  const [participantsData, setParticipantsData] = useState<any>({});
  const [tableLoading, setTableLoading] = useState(false);
  const [initialParticipantsLoading, setInitialParticipantsLoading] =
    useState(false);
  const [firstUser, setFirstUser] = useState<string | undefined>(undefined);
  const [secondUser, setSecondUser] = useState<string | undefined>(undefined);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestCallRef = useRef(0);
  const lastSearchRef = useRef<string>("");
  const [loading, setLoading] = useState(false);
  const [firstUserStyle, setFirstUserStyle] = useState<any>(null);
  const [secondUserStyle, setSecondUserStyle] = useState<any>(null);
  const [firstUserPerformanceGuide, setFirstUserPerformanceGuide] =
    useState<any>(null);
  const [secondUserPerformanceGuide, setSecondUserPerformanceGuide] =
    useState<any>(null);
  const [firstUserBDNA5Scores, setFirstUserBDNA5Scores] = useState<any>(null);
  const [secondUserBDNA5Scores, setSecondUserBDNA5Scores] = useState<any>(null);
  const [participantDetails, setParticipantDetails] = useState<any>(null);
  const [styleMatchPercent, setStyleMatchPercent] = useState<number | null>(
    null,
  );
  const [firstUserCommunicationInsights, setFirstUserCommunicationInsights] =
    useState<any>(null);
  const [secondUserCommunicationInsights, setSecondUserCommunicationInsights] =
    useState<any>(null);

  const fetchParticipantDetails = async () => {
    try {
      setLoading(true);

      const payload = {
        accountId: accountId ?? "",
        participants: [{ personId: firstUser }, { personId: secondUser }],
      };

      const participantDetails = await getParticipantDetailsApi(payload);

      if (participantDetails?.data) {
        setParticipantDetails(participantDetails.data);
      } else {
        console.error(
          "Failed to fetch participant details",
          participantDetails,
        );
      }
    } catch (error) {
      console.error("Error fetching participant details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUniqueStyleData = async () => {
    try {
      const comparisonData = await fetchStyleComparisonData(
        firstUser,
        secondUser,
      );

      setFirstUserStyle(comparisonData.firstUser);
      setSecondUserStyle(comparisonData.secondUser);
    } catch (err) {
      console.error("Failed to fetch unique style data", err);
    }
  };

  const fetchPerformanceGuideForBoth = async () => {
    try {
      const guideData = await fetchPerformanceGuideData(firstUser, secondUser);

      setFirstUserPerformanceGuide(guideData.firstUser);
      setSecondUserPerformanceGuide(guideData.secondUser);
    } catch (err) {
      console.error("Failed to fetch performance guide data", err);
    }
  };

  const fetchBDNA5ScoresForBoth = async () => {
    try {
      const bdnaData = await fetchBDNA5ScoresData(firstUser, secondUser);
      setFirstUserBDNA5Scores(bdnaData.firstUser);
      setSecondUserBDNA5Scores(bdnaData.secondUser);
    } catch (err) {
      console.error("Failed to fetch BDNA5 scores", err);
    }
  };

  const fetchStyleMatch = async () => {
    if (!firstUser || !secondUser) return;
    try {
      const percent = await fetchStyleMatchData(firstUser, secondUser);
      setStyleMatchPercent(percent);
    } catch (err) {
      console.error("Failed to fetch style match", err);
      setStyleMatchPercent(null);
    }
  };

  const fetchCommunicationInsights = async () => {
    if (!firstUser || !secondUser) return;
    try {
      const insights = await fetchCommunicationInsightsData(
        firstUser,
        secondUser,
      );
      setFirstUserCommunicationInsights(insights.firstUser);
      setSecondUserCommunicationInsights(insights.secondUser);
    } catch (err) {
      console.error("Failed to fetch communication insights", err);
      setFirstUserCommunicationInsights(null);
      setSecondUserCommunicationInsights(null);
    }
  };

  const userOptions: UserOption[] =
    participantsData?.userList?.map((user: any) => ({
      value: user.personID,
      label: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      role: user.uniqueStyle ?? "",
    })) ?? [];

  const fetchParticipants = useCallback(
    async (accountId: string, search?: string) => {
      const callId = ++latestCallRef.current;
      const isInitialLoad = search === undefined;

      try {
        if (isInitialLoad) setInitialParticipantsLoading(true);
        setTableLoading(true);

        const response = await searchParticipantByAccountApi({
          accountId,
          pageNumber: 1,
          pageSize: 10,
          ...(search?.trim() && { search: search.trim() }),
        });

        if (callId === latestCallRef.current) {
          if (response?.data) {
            setParticipantsData(response.data);
          } else {
            setParticipantsData({ userList: [] });
          }
        }
      } catch (error) {
        console.error("SearchParticipantByAccount error:", error);
        if (callId === latestCallRef.current) {
          setParticipantsData({ userList: [] });
        }
      } finally {
        if (callId === latestCallRef.current) {
          setTableLoading(false);
          if (isInitialLoad) setInitialParticipantsLoading(false);
        }
      }
    },
    [setParticipantsData, setTableLoading, setInitialParticipantsLoading],
  );

  const debouncedSearch = useCallback(
    (search: string) => {
      lastSearchRef.current = search;
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        if (accountId) fetchParticipants(accountId, search);
      }, DEBOUNCE_MS);
    },
    [accountId],
  );

  useEffect(() => {
    if (accountId) {
      fetchParticipants(accountId);
    }
  }, [accountId]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const firstUserOptions = userOptions.filter(
    (opt) => opt.value !== secondUser,
  );
  const secondUserOptions = userOptions.filter(
    (opt) => opt.value !== firstUser,
  );

  const commonSelectProps = (options: UserOption[]) => ({
    size: "small" as const,
    className: "compare-select",
    options,
    loading: tableLoading,
    popupRender: (origin: React.ReactNode) => (
      <div className="compare-select-dropdown-render">
        {tableLoading ? (
          <div className="compare-select-dropdown-loader" aria-live="polite">
            <Spin size="small" />
            <span className="ml-2 text-xs text-muted-foreground">
              {" "}
              Loading...
            </span>
          </div>
        ) : (
          origin
        )}
      </div>
    ),
    showSearch: true,
    filterOption: false,
    onSearch: debouncedSearch,
    classNames: {
      popup: {
        root: "compare-select-dropdown",
      },
    },
    labelRender: ({ label, value }: any) => {
      const user = userOptions.find((u) => u.value === value);
      return user ? (
        <div className="user-option-content">
          <span className="user-option-name">{user.label}</span>
        </div>
      ) : (
        label
      );
    },
    optionRender: (option: any) => {
      const user = option.data as UserOption;
      return (
        <div className="user-option-content">
          <div className="user-option-name">{user.label}</div>
          <div className="user-option-role">{user.role}</div>
        </div>
      );
    },
  });

  const resetSearchValue = () => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    const previousSearch = lastSearchRef.current?.trim();
    lastSearchRef.current = "";

    if (previousSearch) {
      fetchParticipants(accountId, "");
    }
  };
  const handleFirstUserChange = (value: string) => {
    setFirstUser(value);
    resetSearchValue();
    if (value === secondUser) setSecondUser(undefined);
  };

  const handleSecondUserChange = (value: string) => {
    setSecondUser(value);
    resetSearchValue();
    if (value === firstUser) setFirstUser(undefined);
  };

  const handleCompareStyles = async () => {
    fetchUniqueStyleData();
    fetchParticipantDetails();
    fetchPerformanceGuideForBoth();
    fetchBDNA5ScoresForBoth();
    fetchStyleMatch();
    fetchCommunicationInsights();
  };

  const handleCompareDifferentUsers = () => {
    setFirstUser(undefined);
    setSecondUser(undefined);
    setParticipantDetails(null);
  };

  return (
    <>
      {(loading || initialParticipantsLoading) && <FullScreenLoader />}
      <div className="style-match-section-wrapper">
        <ClientDashboardHeader
          title="Your Style Match Report"
          description="Compare your DNA styles to understand compatibility and collaboration fit."
        />
        <UserSelectForm
          firstUser={firstUser}
          secondUser={secondUser}
          handleFirstUserChange={handleFirstUserChange}
          handleSecondUserChange={handleSecondUserChange}
          commonSelectProps={commonSelectProps}
          firstUserOptions={firstUserOptions}
          secondUserOptions={secondUserOptions}
          handleCompareStyles={handleCompareStyles}
          loading={loading}
        />
      </div>
      {participantDetails &&
        secondUserStyle &&
        secondUserPerformanceGuide &&
        secondUserBDNA5Scores && (
          <ComparisonStyleMatchTabs
            firstUserStyle={firstUserStyle}
            secondUserStyle={secondUserStyle}
            firstUserPerformanceGuide={firstUserPerformanceGuide}
            secondUserPerformanceGuide={secondUserPerformanceGuide}
            firstUserBDNA5Scores={firstUserBDNA5Scores}
            secondUserBDNA5Scores={secondUserBDNA5Scores}
            participantDetails={participantDetails}
            styleMatchPercent={styleMatchPercent}
            firstUserCommunicationInsights={firstUserCommunicationInsights}
            secondUserCommunicationInsights={secondUserCommunicationInsights}
            onCompareDifferentUsers={handleCompareDifferentUsers}
          />
        )}

      <UnLockCommunityCard />
    </>
  );
};

export default StyleMatch;
