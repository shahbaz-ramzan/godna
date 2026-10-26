export const REPORT_NAME = "Financial Behavior";
export const FOOTER_YEAR = new Date().getFullYear();
export const FOOTER_DATE = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export const WORD = "an"; // "You Are an Influencer"

export const REPORT_COLOR = "#339966";
export const PRIMARY_COLOR = "#339966";
export const SECONDARY_COLOR = "#d4a84b";

export const getThumbPosition = (value: number): number => {
  if (!value || value < 1 || value > 7) {
    return 0;
  }
  const totalGroups = 7;
  return ((2 * value - 1) / (2 * totalGroups)) * 100;
};

export const getPrimaryColor = (condition: boolean) => {
  return condition ? { backgroundColor: REPORT_COLOR, color: "white" } : {};
};
