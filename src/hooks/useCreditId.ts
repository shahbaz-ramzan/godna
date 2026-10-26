"use client";

import { getPersonCreditIdApi } from "@/network/apis/discovery";
import { useEffect, useState } from "react";
import { useLoggedPersonId } from "./useLoggedPersonId";

export const useCreditId = () => {
  const [creditId, setCreditId] = useState<string | null>(null);
  const personId = useLoggedPersonId();

  useEffect(() => {
    if (!personId) return;

    const fetchCreditId = async () => {
      try {
        const res: any = await getPersonCreditIdApi(personId);
        const fetchedId = res?.data ? res?.data?.creditId : null;

        setCreditId(fetchedId);
      } catch (e) {
        console.error("Failed to fetch credit ID:", e);
      }
    };

    fetchCreditId();
  }, [personId]);

  return { creditId };
};
