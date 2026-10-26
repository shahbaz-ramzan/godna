"use client";
import { useRef, useState } from "react";
import { Tooltip } from "antd";
import { Pie } from "@ant-design/charts";
import { DonutSkeleton } from "./marketMoodSkeletons";
import { useDonutSize } from "./useDonutSize";
import {
  MOOD_COLOR_MAP,
  MOOD_DISPLAY_ORDER,
  MOOD_LABEL_MAP,
  type MoodEntry,
} from "./marketMoodTypes";

interface LegendItem {
  label: string;
  colorKey: string;
  color: string;
  count: number;
  pct: number;
}

interface MoodDonutProps {
  loading?: boolean;
  moodData?: MoodEntry[] | null;
  activeFilter?: string;
  onFilterChange?: (colorKey: string) => void;
}

const EMPTY_SLICE = [{ type: "No data", value: 1, color: "#e5e7eb" }];

function buildPieConfig(
  legend: LegendItem[],
  total: number,
  size: number,
  activeFilter: string,
) {
  const hasData = total > 0;
  const colorKeyByLabel = Object.fromEntries(
    legend.map((l) => [l.label, l.colorKey]),
  );

  return {
    data: hasData
      ? legend.map(({ label, count }) => ({ type: label, value: count }))
      : EMPTY_SLICE,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.62,
    height: size,
    width: size,
    autoFit: false,
    padding: 0,
    inset: 0,
    margin: 0,
    // @ant-design/plots (AntV G2 5) maps colorField values to colors via
    // scale.color.range, in the same order as domain — not a `color` callback
    scale: {
      color: hasData
        ? {
            domain: legend.map((l) => l.label),
            range: legend.map((l) => l.color),
          }
        : { domain: ["No data"], range: ["#e5e7eb"] },
    },
    label: false,
    legend: false,
    // native G2 tooltip is disabled — hover is handled via onReady + an antd Tooltip
    // below, since G2's own tooltip gets clipped by the card's rounded/overflow container
    tooltip: false,
    style: {
      cursor: hasData ? "pointer" : "default",
      fillOpacity:
        hasData && activeFilter !== "all"
          ? (d: { type: string }) =>
              colorKeyByLabel[d.type] === activeFilter ? 1 : 0.3
          : 1,
    },
    annotations: [
      {
        type: "text",
        style: {
          text: hasData ? `${total}\nTotal` : "No\nData",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
          color: hasData ? "#2a3b4d" : "#9ca3af",
        },
      },
    ],
  };
}

interface HoverSlice {
  label: string;
  count: number;
  pct: number;
  x: number;
  y: number;
}

const MoodDonut = ({
  loading,
  moodData,
  activeFilter = "all",
  onFilterChange,
}: MoodDonutProps) => {
  const size = useDonutSize();
  const [hover, setHover] = useState<HoverSlice | null>(null);
  const pointerPos = useRef({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  if (loading) return <DonutSkeleton />;

  const entryMap = Object.fromEntries(
    (moodData ?? []).map((e) => [e.color, e]),
  );

  const legend: LegendItem[] = MOOD_DISPLAY_ORDER.map((colorKey) => {
    const entry = entryMap[colorKey];
    return {
      label: MOOD_LABEL_MAP[colorKey] ?? colorKey,
      colorKey,
      color: MOOD_COLOR_MAP[colorKey] ?? "#e5e7eb",
      count: entry?.count ?? 0,
      pct: entry?.percentage ?? 0,
    };
  });

  const total = legend.reduce((sum, item) => sum + item.count, 0);
  const pieConfig = buildPieConfig(legend, total, size, activeFilter);
  const legendByLabel = Object.fromEntries(legend.map((l) => [l.label, l]));

  return (
    <div className="mm-left-col">
      <div className="mm-donut-wrap">
        <div
          ref={wrapRef}
          style={{ width: size, height: size, position: "relative" }}
          onMouseMove={(e) => {
            const rect = wrapRef.current?.getBoundingClientRect();
            if (!rect) return;
            pointerPos.current = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            };
            setHover((prev) =>
              prev ? { ...prev, ...pointerPos.current } : prev,
            );
          }}
          onMouseLeave={() => setHover(null)}
        >
          <Pie
            {...(pieConfig as any)}
            onReady={({ chart }: any) => {
              chart.on("element:pointermove", (evt: any) => {
                const sliceLabel = evt.data?.data?.type;
                const info = sliceLabel ? legendByLabel[sliceLabel] : null;
                if (!info) return;
                setHover({
                  label: info.label,
                  count: info.count,
                  pct: info.pct,
                  x: pointerPos.current.x,
                  y: pointerPos.current.y,
                });
              });
              chart.on("element:pointerout", () => setHover(null));
              chart.on("element:click", (evt: any) => {
                const sliceLabel = evt.data?.data?.type;
                const info = sliceLabel ? legendByLabel[sliceLabel] : null;
                if (info) onFilterChange?.(info.colorKey);
              });
            }}
          />
          <Tooltip
            open={!!hover}
            placement="top"
            title={
              hover ? `${hover.label}: ${hover.count} (${hover.pct}%)` : ""
            }
          >
            <span
              style={{
                position: "absolute",
                left: hover?.x ?? -9999,
                top: (hover?.y ?? -9999) - 10,
                width: 1,
                height: 1,
                pointerEvents: "none",
              }}
            />
          </Tooltip>
        </div>
      </div>
      <div className="mm-legend">
        {legend.map((item) => {
          const isActive = activeFilter === item.colorKey;
          const isDimmed = activeFilter !== "all" && !isActive;
          return (
            <div
              key={item.colorKey}
              className={`mm-legend-item${isActive ? " active" : ""}${isDimmed ? " dimmed" : ""}`}
              role={onFilterChange ? "button" : undefined}
              tabIndex={onFilterChange ? 0 : undefined}
              onClick={() => onFilterChange?.(item.colorKey)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  onFilterChange?.(item.colorKey);
              }}
            >
              <span className="mm-legend-label">
                <span
                  className="mm-legend-dot"
                  style={{ backgroundColor: item.color }}
                />
                {item.label}
              </span>
              <span className="mm-legend-value">
                {item.count}
                <span> ({item.pct}%)</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MoodDonut;
