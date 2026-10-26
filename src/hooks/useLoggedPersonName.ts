"use client";

import { STORAGE_KEYS } from "@/constants/localStorageKeys";
import {
  getLocalStorageItem,
  getLocalStorageItemAs,
} from "@/utils/localStorage";
import { useEffect, useState } from "react";

export const useLoggedPersonName = (): string | null => {
  const [personName, setPersonName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = getLocalStorageItem(STORAGE_KEYS.LOGGED_PERSON_NAME);

    const participantDetails = getLocalStorageItemAs<
      Array<{ firstName?: string; lastName?: string }>
    >(STORAGE_KEYS.PARTICIPANT_DETAILS);

    const participantData = participantDetails?.[0];

    if (storedName) {
      setPersonName(storedName);
      return;
    }

    if (participantData) {
      const fullName =
        `${participantData.firstName ?? ""} ${participantData.lastName ?? ""}`.trim();
      setPersonName(fullName);
    }
  }, []);

  return personName;
};
