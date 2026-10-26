"use client";
import { STORAGE_KEYS } from "@/constants/localStorageKeys";
import { useAccountId } from "@/hooks/useAccountId";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import { FieldType } from "@/lib/utils";
import { updateProfileApi } from "@/network/apis/setting";
import { getParticipantDetailsApi } from "@/network/apis/user";
import {
  getLocalStorageItemAs,
  setLocalStorageItem,
} from "@/utils/localStorage";
import type { TabsProps } from "antd";
import { Tabs, Typography } from "antd";
import { Bell, Shield, User, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import ClientDashboardHeader from "../common/clientDashboardHeader/clientDashboardHeader";
import Notification from "./notification";
import Profile from "./profile";
import Security from "./security";
import UsersName from "./usersName";
const { Title } = Typography;

type ParticipantDetails = {
  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
};

const SettingTabs = () => {
  const participantId = useLoggedPersonId();
  const accountId = useAccountId();
  const [participantDetails, setParticipantDetails] =
    useState<ParticipantDetails | null>(null);
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false);

  useEffect(() => {
    const storedParticipantDetails = getLocalStorageItemAs<
      ParticipantDetails[]
    >(STORAGE_KEYS.PARTICIPANT_DETAILS, []);
    const firstParticipant = storedParticipantDetails?.[0];

    if (firstParticipant) {
      setParticipantDetails(firstParticipant);
      return;
    }

    fetchParticipantDetails();
  }, [accountId, participantId]);

  const fetchParticipantDetails = async () => {
    try {
      const response = await getParticipantDetailsApi({
        accountId,
        participants: [{ personId: participantId }],
      });

      if (response?.data) {
        const firstParticipant = response.data?.[0];
        if (firstParticipant) {
          setParticipantDetails(firstParticipant);
          setLocalStorageItem(STORAGE_KEYS.PARTICIPANT_DETAILS, response.data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch participant details:", error);
    }
  };
  const onProfileSubmit = async (values: FieldType) => {
    setIsProfileSubmitting(true);
    try {
      const response: any = await updateProfileApi({
        id: participantId,
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        username: values.email,
        company: values.companyName,
      });

      if (!response?.data) {
        throw new Error(response?.message ?? "Profile update failed");
      }

      const storedDetails = getLocalStorageItemAs<ParticipantDetails[]>(
        STORAGE_KEYS.PARTICIPANT_DETAILS,
        [],
      );
      const updatedDetails = {
        ...storedDetails[0],
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        companyName: values.companyName,
      };

      setParticipantDetails(updatedDetails);
      setLocalStorageItem(STORAGE_KEYS.PARTICIPANT_DETAILS, [updatedDetails]);
      toast.success(
        typeof response.data === "string"
          ? response.data
          : "Profile updated successfully",
      );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Profile update failed",
      );
    } finally {
      setIsProfileSubmitting(false);
    }
  };

  const items: TabsProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: "Profile",
        children: (
          <Profile
            participantDetails={participantDetails}
            onParticipantDataChange={setParticipantDetails}
            onSubmit={onProfileSubmit}
            isSubmitting={isProfileSubmitting}
          />
        ),
        icon: <User />,
      },
      {
        key: "2",
        label: "Notification",
        children: <Notification />,
        icon: <Bell />,
      },
      {
        key: "3",
        label: "Security",
        children: <Security />,
        icon: <Shield />,
      },
      {
        key: "4",
        label: "Named Users",
        children: <UsersName participantDetails={participantDetails} />,
        icon: <Users />,
      },
    ],
    [isProfileSubmitting, participantDetails],
  );

  return (
    <>
      <ClientDashboardHeader
        title="Settings"
        description="Manage your account and preferences"
      />

      <Tabs
        size="small"
        className="thm-tabs setting-tabs"
        defaultActiveKey="1"
        items={items}
      />
    </>
  );
};

export default SettingTabs;
