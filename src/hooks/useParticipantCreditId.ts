"use client";

import { getPersonCreditIdApi } from "@/network/apis/discovery";
import { useEffect, useState } from "react";
import { useLoggedPersonId } from "./useLoggedPersonId";

export const useParticipantCreditId = () => {
  const [participantCreditId, setParticipantCreditId] = useState<string | null>(
    null,
  );
  const personId = useLoggedPersonId();

  useEffect(() => {
    if (!personId) return;

    const fetchParticipantCreditId = async () => {
      try {
        const res: any = await getPersonCreditIdApi(personId);
        const fetchedId = res?.data ? res?.data?.participantCreditId : null;

        setParticipantCreditId(fetchedId);
      } catch (error) {
        console.error("Failed to fetch participant credit ID:", error);
      }
    };

    fetchParticipantCreditId();
  }, [personId]);

  return { participantCreditId };
};
