"use client";

import { STORAGE_KEYS } from "@/constants/localStorageKeys";
import { toggleDiscoveryReminderEmailsApi } from "@/network/apis/setting";
import {
  getLocalStorageItemAs,
  setLocalStorageItem,
} from "@/utils/localStorage";
import { Switch, Typography } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const { Title, Text } = Typography;

const Notification = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateNotificationPreferences = async (payload: any) => {
    try {
      setIsLoading(true);
      const response: any = await toggleDiscoveryReminderEmailsApi(payload);
      if (response?.message && !response?.errors) {
        toast.success(response?.message);
        const existing = getLocalStorageItemAs<any[]>(
          STORAGE_KEYS.PARTICIPANT_DETAILS,
          [],
        );
        setLocalStorageItem(STORAGE_KEYS.PARTICIPANT_DETAILS, [
          { ...existing?.[0], enableEmail: !emailNotifications },
        ]);
        setEmailNotifications(!emailNotifications);
      }
    } catch (error) {
      console.error("Failed to update notification preferences", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const details = getLocalStorageItemAs<any[]>(
      STORAGE_KEYS.PARTICIPANT_DETAILS,
      [],
    );
    if (details?.length) {
      setEmailNotifications(details[0]?.enableEmail ?? false);
    }
  }, []);

  return (
    <div className="notification-card glass-card p-8">
      <Title level={2} className="title">
        Notification Preferences
      </Title>
      <div className="notify-content">
        <div className="notify-item">
          <div className="ni-info">
            <Title level={4} className="notify-title">
              Email notifications
            </Title>
            <Text className="notify-text">
              Receive email updates about your account
            </Text>
          </div>
          <Switch
            checked={emailNotifications}
            onChange={(checked) =>
              updateNotificationPreferences({ enabled: checked })
            }
            loading={isLoading}
            size="small"
            className="thm-switch"
          />
        </div>
        {/* <div className="notify-item">
          <div className="ni-info">
            <Title level={4} className="notify-title">
              Daily insights
            </Title>
            <Text className="notify-text">
              Get daily behavioral insights and tips
            </Text>
          </div>
          <Switch
            checked={dailyInsights}
            onChange={setDailyInsights}
            size="small"
            className="thm-switch"
          />
        </div>
        <div className="notify-item">
          <div className="ni-info">
            <Title level={4} className="notify-title">
              Named user updates
            </Title>
            <Text className="notify-text">
              Notifications when named users complete assessments
            </Text>
          </div>
          <Switch
            checked={namedUserUpdates}
            onChange={setNamedUserUpdates}
            size="small"
            className="thm-switch"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Notification;
