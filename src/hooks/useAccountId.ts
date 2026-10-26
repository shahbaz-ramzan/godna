"use client";

import { STORAGE_KEYS } from "@/constants/localStorageKeys";
import { getLocalStorageItem } from "@/utils/localStorage";
import { useEffect, useState } from "react";

export const useAccountId = (): string | null => {
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const storedAccountId = getLocalStorageItem(STORAGE_KEYS.ACCOUNT_ID);
    setAccountId(storedAccountId);
  }, []);

  return accountId;
};
