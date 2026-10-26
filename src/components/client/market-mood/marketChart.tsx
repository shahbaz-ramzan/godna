"use client";
import { useMemo, useRef, useState } from "react";
import { Tooltip } from "antd";
import { ChartSkeleton } from "./marketMoodSkeletons";
import { MOOD_COLOR_MAP, MOOD_LABEL_MAP } from "./marketMoodTypes";

const CHART_WIDTH = 1200;
const CHART_HEIGHT = 300;
const PAD_LEFT = 20;
const PAD_RIGHT = 20;
const Y_TOP = 18;
const Y_BOTTOM = 282;

const GRID_Y = [50, 97, 144, 191, 238, 285];

// ─── MoodIcon ────────────────────────────────────────────────────────────────

const SVG_BASE = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "#9aa6b2",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const EYES = (
  <>
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </>
);

const MOOD_MOUTH: Record<string, React.ReactNode> = {
  Exuberant: <path d="M8 13s1.5 3 4 3 4-3 4-3" />,
  Comfortable: <path d="M8 14s1.5 2 4 2 4-2 4-2" />,
  Watchful: <line x1="8" y1="15" x2="16" y2="15" />,
  Apprehensive: <path d="M16 16s-1.5-2-4-2-4 2-4 2" />,
};

const MoodIcon = ({ mood, color }: { mood?: string; color?: string }) => (
  <svg {...SVG_BASE} stroke={color ?? SVG_BASE.stroke}>
    <circle cx="12" cy="12" r="10" />
    {EYES}
    {MOOD_MOUTH[mood ?? ""] ?? MOOD_MOUTH.Comfortable}
  </svg>
);

// ─── Chart math helpers ───────────────────────────────────────────────────────

function smoothPath(pts: { x: number; y: number }[]) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x} ${p2.y}`;
  }
  return d;
}

// "August 31, 2026" → "Aug 31, '26"
function shortenDateLabel(label: string) {
  const date = new Date(label);
  if (Number.isNaN(date.getTime())) return label;
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = String(date.getFullYear()).slice(-2);
  return `${month} ${date.getDate()}, '${year}`;
}

function buildChartGeometry(
  marketMoodData?: number[],
  marketMoodLabels?: string[],
) {
  // API returns newest-first; reverse so the chart renders oldest → newest (left → right)
  const vals = marketMoodData?.length ? [...marketMoodData].reverse() : [];
  const labels = marketMoodLabels?.length
    ? [...marketMoodLabels].reverse()
    : [];
  const n = vals.length;

  if (n === 0) {
    return {
      pathD: "",
      areaD: "",
      gridX: [],
      dateLabels: [],
      points: [],
      latestValue: null,
    };
  }

  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;

  const xAt = (i: number) =>
    PAD_LEFT + i * ((CHART_WIDTH - PAD_LEFT - PAD_RIGHT) / Math.max(n - 1, 1));
  const yAt = (v: number) =>
    Y_BOTTOM - ((v - min) / range) * (Y_BOTTOM - Y_TOP);

  const pts = vals.map((v, i) => ({
    x: +xAt(i).toFixed(1),
    y: +yAt(v).toFixed(1),
  }));
  const line = smoothPath(pts);
  const area = `${line} L ${pts[n - 1].x} ${Y_BOTTOM} L ${pts[0].x} ${Y_BOTTOM} Z`;

  const gridX = Array.from(
    { length: 9 },
    (_, i) =>
      +(PAD_LEFT + i * ((CHART_WIDTH - PAD_LEFT - PAD_RIGHT) / 8)).toFixed(1),
  );

  // Up to 5 evenly-spaced date labels pinned to real data-point x positions
  const dateLabels: { label: string; leftPct: string }[] = [];
  if (labels.length > 0) {
    const count = Math.min(5, n);
    // When n===1, step would be NaN — guard so we just show the single label
    const step = count > 1 ? (n - 1) / (count - 1) : 0;
    for (let k = 0; k < count; k++) {
      const idx = Math.round(k * step);
      dateLabels.push({
        label: shortenDateLabel(labels[idx]),
        leftPct: `${((xAt(idx) / CHART_WIDTH) * 100).toFixed(2)}%`,
      });
    }
  }

  // Hover hit-testing data: real SVG coords + formatted value/date per point
  const points = pts.map((p, i) => ({
    x: p.x,
    y: p.y,
    value: vals[i],
    date: labels[i] ? shortenDateLabel(labels[i]) : "",
  }));

  return {
    pathD: line,
    areaD: area,
    gridX,
    dateLabels,
    points,
    latestValue: vals[n - 1],
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

interface MarketChartProps {
  loading?: boolean;
  marketMoodData?: number[];
  marketMoodLabels?: string[];
  marketMood?: string;
  marketMoodColor?: string;
}

interface HoverPoint {
  svgX: number;
  svgY: number;
  localX: number;
  localY: number;
  value: number;
  date: string;
}

const MarketChart = ({
  loading,
  marketMoodData,
  marketMoodLabels,
  marketMood,
  marketMoodColor,
}: MarketChartProps) => {
  const { pathD, areaD, gridX, dateLabels, points, latestValue } = useMemo(
    () => buildChartGeometry(marketMoodData, marketMoodLabels),
    [marketMoodData, marketMoodLabels],
  );
  const [hover, setHover] = useState<HoverPoint | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  if (loading) return <ChartSkeleton />;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect || points.length === 0) return;

    const scaleX = CHART_WIDTH / rect.width;
    const svgX = (e.clientX - rect.left) * scaleX;

    let nearest = points[0];
    let minDist = Math.abs(svgX - nearest.x);
    for (const p of points) {
      const dist = Math.abs(svgX - p.x);
      if (dist < minDist) {
        minDist = dist;
        nearest = p;
      }
    }

    const scale = rect.width / CHART_WIDTH;
    setHover({
      svgX: nearest.x,
      svgY: nearest.y,
      localX: nearest.x * scale,
      localY: nearest.y * scale,
      value: nearest.value,
      date: nearest.date,
    });
  };

  const displayValue = latestValue ?? "—";
  const moodHex = MOOD_COLOR_MAP[marketMoodColor ?? ""];
  // Use our fixed display label (same as the donut legend / table filters)
  // instead of the API's raw `mood` string, which can vary in wording.
  const moodLabel = MOOD_LABEL_MAP[marketMoodColor ?? ""] ?? marketMood;

  return (
    <div className="mm-right-col">
      <div className="mm-chart-header">
        <div>
          <div className="mm-index-label">
            United States Index: <strong>{displayValue}</strong>
          </div>
          <div className="mm-chart-subtitle">
            Trailing 15 day S&amp;P 500 performance
          </div>
        </div>
        {marketMood && (
          <div
            className="mm-comfort-badge"
            style={
              moodHex
                ? {
                    backgroundColor: `${moodHex}20`,
                    borderColor: `${moodHex}60`,
                    color: moodHex,
                  }
                : undefined
            }
          >
            <MoodIcon mood={moodLabel} color={moodHex} />
            <span>{moodLabel}</span>
          </div>
        )}
      </div>

      <div
        ref={wrapRef}
        className="mm-chart-svg-wrap"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHover(null)}
      >
        <svg
          viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {pathD && <path d={areaD} fill="#eaecf1" stroke="none" />}

          {GRID_Y.map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2={CHART_WIDTH}
              y2={y}
              stroke="#c3cbd9"
              strokeWidth="1"
              strokeDasharray="5 6"
            />
          ))}

          {gridX.map((x) => (
            <line
              key={x}
              x1={x}
              y1="6"
              x2={x}
              y2="294"
              stroke="#c3cbd9"
              strokeWidth="1"
              strokeDasharray="5 6"
            />
          ))}

          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#838ba0"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {hover && (
            <>
              <line
                x1={hover.svgX}
                y1={Y_TOP}
                x2={hover.svgX}
                y2={Y_BOTTOM}
                stroke="#838ba0"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle
                cx={hover.svgX}
                cy={hover.svgY}
                r="6"
                fill="#fff"
                stroke="#5b6b85"
                strokeWidth="3"
              />
            </>
          )}
        </svg>

        {hover && (
          <Tooltip
            open
            placement="top"
            title={`${hover.value}${hover.date ? ` · ${hover.date}` : ""}`}
          >
            <span
              style={{
                position: "absolute",
                left: hover.localX,
                top: hover.localY - 10,
                width: 1,
                height: 1,
                pointerEvents: "none",
              }}
            />
          </Tooltip>
        )}

        <div className="mm-chart-dates">
          {dateLabels.map((d) => (
            <span
              key={d.label}
              className="mm-date-label"
              style={{ left: d.leftPct }}
            >
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketChart;
