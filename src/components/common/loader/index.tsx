"use client";

export const DNASpinner = ({ size = 64 }: { size?: number }) => {
  const dotOuter = size * 0.078; // ~5
  const dotInner = size * 0.0625; // ~4
  const ringWidth = size * 0.054; // ~3.5
  const innerInset = size * 0.156; // ~10

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ring */}
      <div style={{ position: "absolute", inset: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `${ringWidth * 0.857}px solid rgba(0, 183, 149, 0.12)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, transparent 0%, #004e92 35%, #00b795 100%)",
            WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${ringWidth}px), white calc(100% - ${ringWidth * 0.857}px))`,
            mask: `radial-gradient(farthest-side, transparent calc(100% - ${ringWidth}px), white calc(100% - ${ringWidth * 0.857}px))`,
            animation: "dna-spin 1.0s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 1,
            left: `calc(50% - ${dotOuter / 2}px)`,
            width: dotOuter,
            height: dotOuter,
            borderRadius: "50%",
            backgroundColor: "#00b795",
            boxShadow: "0 0 7px 2px rgba(0, 183, 149, 0.6)",
            animation: "dna-spin 1.0s linear infinite",
            transformOrigin: `${dotOuter / 2}px ${size / 2 - 1}px`,
          }}
        />
      </div>

      {/* Inner ring */}
      <div style={{ position: "absolute", inset: innerInset }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "2.5px solid rgba(0, 78, 146, 0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "conic-gradient(from 0deg, transparent 0%, #00b795 40%, #004e92 100%)",
            WebkitMask: `radial-gradient(farthest-side, transparent calc(100% - ${ringWidth}px), white calc(100% - ${ringWidth * 0.857}px))`,
            mask: `radial-gradient(farthest-side, transparent calc(100% - ${ringWidth}px), white calc(100% - ${ringWidth * 0.857}px))`,
            animation: "dna-spin-reverse 1.5s linear infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 1,
            left: `calc(50% - ${dotInner / 2}px)`,
            width: dotInner,
            height: dotInner,
            borderRadius: "50%",
            backgroundColor: "#004e92",
            boxShadow: "0 0 6px 2px rgba(0, 78, 146, 0.5)",
            animation: "dna-spin-reverse 1.5s linear infinite",
            transformOrigin: `${dotInner / 2}px ${(size - innerInset * 2) / 2 - 1}px`,
          }}
        />
      </div>

      {/* Pulsing center core */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#00b795",
          animation: "dna-pulse 1.4s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes dna-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes dna-spin-reverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes dna-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(0, 183, 149, 0.45);
          }
          50% {
            transform: scale(1.35);
            box-shadow: 0 0 0 7px rgba(0, 183, 149, 0);
          }
        }
      `}</style>
    </div>
  );
};

interface FullScreenLoaderProps {
  backgroundColor?: string;
}

const FullScreenLoader = ({
  backgroundColor = "rgba(255, 255, 255, 0.88)",
}: FullScreenLoaderProps) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        backgroundColor,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <DNASpinner size={64} />
    </div>
  );
};

export default FullScreenLoader;
