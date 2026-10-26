import { InvestmentTabSkeleton } from "@/components/common/skeletons";
import { useLoggedPersonId } from "@/hooks/useLoggedPersonId";
import { getBehavioralBiasesArrayApi } from "@/network/apis/report";
import { AppDispatch, RootState } from "@/store";
import { setBehavioralBiases } from "@/store/slices/reportSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const InvestmentTab = () => {
  const behavioralBiases = useSelector(
    (state: RootState) => state.report.behavioralBiases
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const personId = useLoggedPersonId();

  const fetchBehavioralBiases = async (personId: string) => {
    try {
      setIsLoading(true);
      const response: any = await getBehavioralBiasesArrayApi(personId);
      dispatch(setBehavioralBiases(response?.data));
    } catch (error) {
      console.error("Error fetching behavioral biases:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (personId) {
      fetchBehavioralBiases(personId);
    }
  }, [personId]);

  if (isLoading && !behavioralBiases) {
    return <InvestmentTabSkeleton />;
  }

  return (
    <div className="investment-card-wrapper glass-card p-8 space-y-6">
      <div className="investment-card-list">
        <h4>Recommended Investment Mix</h4>
        <div className="investment-card-list-wrapper">
          {behavioralBiases?.behavioralBiasList?.map((item, index) => (
            <div
              key={item?.id ?? index}
              className="investment-card-list-item glass-card"
            >
              <h6>{item?.name}</h6>
              <span data-slot="badge">
                {item?.population ?? 0}%
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default InvestmentTab;
