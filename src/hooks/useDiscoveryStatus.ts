import { getDiscoveryStatusApi } from "@/network/apis/discovery";
import { AppDispatch, RootState } from "@/store";
import { setDiscoveryStatus } from "@/store/slices/discoverySlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCreditId } from "./useCreditId";

export const useDiscoveryStatus = () => {
  const { creditId } = useCreditId();
  const dispatch = useDispatch<AppDispatch>();
  const discoveryStatus = useSelector((state: RootState) => state.discovery);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!creditId || hasFetched.current) return;

    hasFetched.current = true;

    const fetchDiscoveryStatus = async () => {
      try {
        const res: any = await getDiscoveryStatusApi(creditId);
        dispatch(
          setDiscoveryStatus({
            completed: res?.data?.completed,
            inProgress: res?.data?.inProgress,
            scheduled: res?.data?.scheduled,
          }),
        );
      } catch (error) {
        console.error("Failed to fetch discovery status:", error);
      }
    };

    fetchDiscoveryStatus();
  }, [creditId, dispatch]);

  return discoveryStatus;
};
