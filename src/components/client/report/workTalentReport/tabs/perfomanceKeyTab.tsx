import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const PerfomanceKeyTab = () => {
  const strengths = useSelector(
    (state: RootState) => state.report.performanceGuideArray?.strengths
  );

  const struggles = useSelector(
    (state: RootState) => state.report.performanceGuideArray?.struggles
  );

  return (
    <div className="performance-card-wrapper">
      <div className="performance-row">
        {/* Strengths */}
        <div className="performance-card-item glass-card">
          <h3>Strengths</h3>

          <ul className="performance-list">
            {strengths?.map((item, index) => (
              <li key={index}>
                <div className="performance-list-item-icon" />
                <div className="performance-list-item-text">
                  <h4>{item?.description}</h4>
                  <p>{item?.detailedDescription}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Struggles */}
        <div className="performance-card-item glass-card">
          <h3>Struggles</h3>

          <ul className="performance-list">
            {struggles?.map((item, index) => (
              <li key={index}>
                <div className="performance-list-item-icon struggles-icon" />
                <div className="performance-list-item-text">
                  <h4>{item?.description}</h4>
                  <p>{item?.detailedDescription}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
