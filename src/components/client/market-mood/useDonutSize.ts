"use client";
import { useEffect, useState } from "react";

// mm-main-grid stacks to a single column below 900px (see _dashboard.scss);
// shrink the donut there so it doesn't dominate the stacked layout.
// Shared by MoodDonut and DonutSkeleton so loading → loaded doesn't jump in size.
export const DONUT_SIZE_DEFAULT = 170;
export const DONUT_SIZE_NARROW = 140;

export function useDonutSize() {
  const [size, setSize] = useState(DONUT_SIZE_DEFAULT);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 900px)");
    const update = () =>
      setSize(mql.matches ? DONUT_SIZE_NARROW : DONUT_SIZE_DEFAULT);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return size;
}
