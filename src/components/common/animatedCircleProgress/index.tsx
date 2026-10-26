import { Progress, ProgressProps, Tooltip } from "antd";
import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { useCountAnimation } from "../../../hooks/useCountAnimation";

interface AnimatedCircleProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  percent: number;
  size?: number;
  strokeColor?: ProgressProps["strokeColor"];
  strokeWidth?: number;
  strokeLinecap?: "round" | "butt" | "square";
  showInfo?: boolean;
  format?: (animatedValue: number) => React.ReactNode;
  tooltip?: string;
  triggerKey?: number;
}

export const AnimatedCircleProgress = forwardRef<
  HTMLDivElement,
  AnimatedCircleProgressProps
>(
  (
    {
      percent,
      size = 135,
      strokeColor,
      strokeWidth = 8,
      strokeLinecap = "round",
      showInfo = true,
      format,
      style,
      className,
      tooltip,
      triggerKey,
      ...rest
    },
    forwardedRef,
  ) => {
    const { value, runAnimation, cleanup } = useCountAnimation();

    const internalRef = useRef<HTMLDivElement>(null);

    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        (internalRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    useEffect(() => {
      if (triggerKey === undefined || triggerKey === 0) return;
      runAnimation(percent);
    }, [triggerKey, percent, runAnimation]);

    useEffect(() => {
      if (triggerKey !== undefined) return;

      const el = internalRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) runAnimation(percent);
        },
        { threshold: 0.1 },
      );

      observer.observe(el);
      return () => {
        observer.disconnect();
        cleanup();
      };
    }, [percent, runAnimation, triggerKey, cleanup]);

    const defaultFormat = () => (
      <span style={{ color: "#004E92", fontWeight: 600 }}>{value}%</span>
    );

    const progress = (
      <Progress
        type="circle"
        percent={value}
        size={size}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap={strokeLinecap}
        showInfo={showInfo}
        format={
          showInfo ? (format ? () => format(value) : defaultFormat) : undefined
        }
      />
    );

    return (
      <div
        ref={setRef}
        style={style}
        className={`animated-circle-progress${className ? ` ${className}` : ""}`}
        {...rest}
      >
        {tooltip ? <Tooltip title={tooltip}>{progress}</Tooltip> : progress}
      </div>
    );
  },
);

AnimatedCircleProgress.displayName = "AnimatedCircleProgress";
