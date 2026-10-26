import Image from "next/image";
import Link from "next/link";
import siteLogo from "@/assets/images/logo.png";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#f8f9fa", fontFamily: "Inter, sans-serif" }}
    >
      <Link href="/" className="mb-10 block">
        <Image src={siteLogo} alt="GoDNA" width={140} height={40} priority />
      </Link>
      <div className="text-center mb-8">
        <p
          className="font-extrabold leading-none select-none"
          style={{
            fontSize: "clamp(96px, 20vw, 160px)",
            background: "linear-gradient(135deg, #004e92 0%, #00b795 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </p>
      </div>
      <div className="text-center mb-10 max-w-md">
        <h1 className="text-2xl font-bold mb-3" style={{ color: "#0f172a" }}>
          The page you requested does not exist.
        </h1>
        <p className="text-base leading-relaxed" style={{ color: "#64748b" }}>
          Please click the buttons below to return to the home page.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center justify-center font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
        style={{
          background: "linear-gradient(135deg, #004e92 0%, #00b795 100%)",
          borderRadius: "100px",
          height: "48px",
          padding: "0 36px",
          fontSize: "15px",
          textDecoration: "none",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
