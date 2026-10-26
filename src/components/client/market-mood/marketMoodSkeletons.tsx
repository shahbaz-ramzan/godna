"use client";
import { useDonutSize } from "./useDonutSize";

const MOOD_ORDER = ["Exuberant", "Comfortable", "Watchful", "Apprehensive"];

export const DonutSkeleton = () => {
  const size = useDonutSize();
  const center = size / 2;
  const radius = (size * 64) / 170;
  const strokeWidth = (size * 25) / 170;

  return (
    <div className="mm-left-col">
      <div className="mm-donut-wrap">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          <text
            x={center}
            y={center - 3}
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#d1d5db"
          >
            —
          </text>
          <text
            x={center}
            y={center + 15}
            textAnchor="middle"
            fontSize="12"
            fill="#d1d5db"
          >
            Total
          </text>
        </svg>
      </div>
      <div className="mm-legend">
        {MOOD_ORDER.map((label) => (
          <div key={label} className="mm-legend-item">
            <span className="mm-legend-label">
              <span
                className="mm-legend-dot"
                style={{ backgroundColor: "#e5e7eb" }}
              />
              <span
                className="bg-gray-200 rounded h-3.5 inline-block"
                style={{ width: 80 }}
              />
            </span>
            <span
              className="bg-gray-200 rounded h-3.5 inline-block"
              style={{ width: 44 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ChartSkeleton = () => (
  <div className="mm-right-col">
    <div className="mm-chart-header">
      <div>
        <div className="bg-gray-200 rounded h-5 w-44" />
        <div className="bg-gray-200 rounded h-4 w-36 mt-1" />
      </div>
      <div className="bg-gray-200 rounded-full h-7 w-28" />
    </div>
    <div className="mm-chart-svg-wrap">
      <svg
        viewBox="0 0 1200 300"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <rect x="0" y="0" width="1200" height="300" fill="#f3f4f6" rx="8" />
        {[50, 97, 144, 191, 238, 285].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="1200"
            y2={y}
            stroke="#d1d5db"
            strokeWidth="1"
            strokeDasharray="5 6"
          />
        ))}
        {Array.from({ length: 9 }, (_, i) => 20 + i * 145).map((x) => (
          <line
            key={x}
            x1={x}
            y1="6"
            x2={x}
            y2="294"
            stroke="#d1d5db"
            strokeWidth="1"
            strokeDasharray="5 6"
          />
        ))}
      </svg>
      <div className="mm-chart-dates">
        {[0, 25, 50, 75, 100].map((pct) => (
          <span
            key={pct}
            className="bg-gray-200 rounded absolute -translate-x-1/2 h-3 w-12"
            style={{ left: `${pct}%` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export const StripSkeleton = () => (
  <div className="mm-community-strip">
    <span
      className="bg-gray-200 rounded-full inline-block"
      style={{ width: 88, height: 28, flexShrink: 0 }}
    />
    <div className="mm-strip-divider" />
    <div className="flex flex-col gap-2" style={{ flex: 1 }}>
      <span
        className="bg-gray-200 rounded inline-block h-3"
        style={{ width: "55%" }}
      />
      <span
        className="bg-gray-200 rounded inline-block h-3"
        style={{ width: "40%" }}
      />
    </div>
  </div>
);
