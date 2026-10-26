"use client";

import { STORAGE_KEYS } from "@/constants/localStorageKeys";
import { useEffect, useState } from "react";
import { getLocalStorageItem } from "@/utils/localStorage";

export const useLoggedPersonId = (): string | null => {
  const [personId, setPersonId] = useState<string | null>(null);

  useEffect(() => {
    const storedId = getLocalStorageItem(STORAGE_KEYS.PERSON_ID);
    setPersonId(storedId);
  }, []);

  return personId;
};
