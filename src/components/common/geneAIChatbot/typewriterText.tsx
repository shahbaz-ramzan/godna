"use client";

import { useEffect, useState } from "react";

const TYPEWRITER_SPEED_MS = 24;

const TypewriterText = ({
  content,
  animate,
}: Readonly<{ content: string; animate: boolean }>) => {
  const [displayLength, setDisplayLength] = useState(
    animate ? 0 : content.length,
  );

  useEffect(() => {
    if (!animate) return;
    setDisplayLength(0);
    if (content.length === 0) return;
    const id = setInterval(() => {
      setDisplayLength((prev) => {
        if (prev >= content.length) {
          clearInterval(id);
          return prev;
        }
        return prev + 1;
      });
    }, TYPEWRITER_SPEED_MS);
    return () => clearInterval(id);
  }, [content, animate]);

  return animate ? <>{content.slice(0, displayLength)}</> : <>{content}</>;
};

export default TypewriterText;
