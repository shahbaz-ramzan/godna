// Shared types and constants for the Market Mood feature

export interface MoodEntry {
  color: string;
  mood: string;
  count: number;
  percentage: number;
}

export interface MarketMoodUser {
  personID: string;
  firstName: string;
  lastName: string;
  uniqueStyle: string;
  mood?: string;
  color?: string;
  isDigitalScanV1_5Imported?: boolean;
}

// color key → hex (matches API `color` field: Green, Neutral, Amber, Red)
// Kept in sync with the admin app's Market Mood donut
// (Admin-System-Frontend dashboard.component.ts initializeChartDefaults())
export const MOOD_COLOR_MAP: Record<string, string> = {
  Green: "#2E9B66",
  Neutral: "#E5E5E5",
  Amber: "#EEAD32",
  Red: "#E05534",
};

// Canonical display order: positive → negative (used by tabs and donut legend)
export const MOOD_DISPLAY_ORDER = ["Green", "Neutral", "Amber", "Red"] as const;

// color key → our fixed display label. The API's own `mood` field can return
// different wording (e.g. "Opportunistic"/"Concerned"/"Fearful"), but the UI
// always shows these labels so the donut legend and table filters stay in sync.
export const MOOD_LABEL_MAP: Record<string, string> = {
  Green: "Exuberant",
  Neutral: "Comfortable",
  Amber: "Watchful",
  Red: "Apprehensive",
};

export const MOOD_FILTERS = [
  { key: "all", label: "All", color: null },
  { key: "Green", label: MOOD_LABEL_MAP.Green, color: MOOD_COLOR_MAP.Green },
  {
    key: "Neutral",
    label: MOOD_LABEL_MAP.Neutral,
    color: MOOD_COLOR_MAP.Neutral,
  },
  { key: "Amber", label: MOOD_LABEL_MAP.Amber, color: MOOD_COLOR_MAP.Amber },
  { key: "Red", label: MOOD_LABEL_MAP.Red, color: MOOD_COLOR_MAP.Red },
] as const;
