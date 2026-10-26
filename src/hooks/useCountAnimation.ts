import { useCallback, useRef, useState } from "react";

const DURATION_MS = 1800;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function useCountAnimation() {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const runAnimation = useCallback((target: number) => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(timerRef.current);
    setValue(0);

    let startTime: number | null = null;
    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min((now - startTime) / DURATION_MS, 1);
      setValue(Math.round(easeOut(t) * target));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    timerRef.current = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, 50);
  }, []);

  const cleanup = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(timerRef.current);
  }, []);

  return { value, runAnimation, cleanup };
}
