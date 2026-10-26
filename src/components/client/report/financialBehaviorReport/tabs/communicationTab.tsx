import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const CommunicationTab = () => {
  const environmentKeys = useSelector(
    (state: RootState) => state.report.performanceGuideArray?.environmentKeys
  );

  return (
    <div className="communication-card-wrapper glass-card p-8 space-y-6">
      <h3>Communication Keys</h3>

      <p className="communication-card-description">
        How to discuss money effectively
      </p>

      <div className="communication-card-list">
        {environmentKeys?.map((item, index) => (
          <div
            key={index}
            className="communication-card-list-item glass-card"
          >
            <h4>{item?.description}</h4>
            <p>{item?.detailedDescription}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunicationTab;
