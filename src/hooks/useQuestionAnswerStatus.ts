import { getQuestionAnswerStatusApi } from "@/network/apis/discovery";
import { useEffect, useState } from "react";
import { useLoggedPersonId } from "./useLoggedPersonId";

type QuestionAnswerStatus = {
  inProgress: boolean;
  loading: boolean;
};
const DEFAULT_STATUS: QuestionAnswerStatus = {
  inProgress: false,
  loading: true,
};

export const useQuestionAnswerStatus = () => {
  const [status, setStatus] = useState<QuestionAnswerStatus>(DEFAULT_STATUS);
  const personId = useLoggedPersonId();

  const fetchStatus = async () => {
    try {
      setStatus((prev) => ({ ...prev, loading: true }));
      const response: any = await getQuestionAnswerStatusApi(personId);
      const apiStatus = response?.data?.status === true;

      setStatus({
        inProgress: apiStatus,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch question answer status:", error);
      setStatus({
        inProgress: false,
        loading: false,
      });
    }
  };

  useEffect(() => {
    if (personId) {
      fetchStatus();
      return;
    }

    setStatus((prev) => ({
      ...prev,
      loading: false,
    }));
  }, [personId]);

  return status;
};
