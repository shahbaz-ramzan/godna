import { Area } from "react-easy-crop";
import { jwtDecode } from "jwt-decode";

import { cookieKeys } from "@/constants/cookiePreferences";

import { getaCookie } from "./cookies";

export function Capitalize(value: string): string {
  let newValue = value
    .split(" ")
    .map((d: string) => d.charAt(0).toUpperCase() + d.slice(1))
    .join(" ");
  return newValue;
}

export function getCountryName(countryId: string, t: Function): string {
  if (!countryId) return "";

  return t(`common:countries.${countryId}`, null, {
    default: countryId || "",
  });
}

export function getStateName(stateId: string, t: Function): string {
  if (!stateId) return "";

  return t(`common:states.${stateId}`, null, {
    default: stateId || "",
  });
}

export function ScrollToTop() {
  setTimeout(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, 0);
}

export const getImageFromUrl = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.src = url;
  });
};

export const getBlobFromCanvas = (
  canvas: HTMLCanvasElement,
  file: File,
): Promise<void> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob: any) => {
      if (blob) {
        blob.name = file.name;
        blob.lastModified = file.lastModified;
        resolve(blob);
      } else {
        reject(new Error("Canvas is empty"));
      }
    }, file.type);
  });
};

export const cropImage = async (imageUrl: string, file: File, crop: Area) => {
  const image: HTMLImageElement = await getImageFromUrl(imageUrl);
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");

  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx?.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  return await getBlobFromCanvas(canvas, file);
};

export const extractFileIdFromUrl = (fileUrl: string = "") => {
  const fileName = fileUrl.split("%2F").pop();
  const fileId = fileName?.split(".").shift();

  return fileId;
};

export const uuid = () => {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
};

export const truncate = (str: string, num: number) => {
  if (str.length <= num || num === 0) {
    return str;
  }
  return str.slice(0, num) + "...";
};

export const escapeNewLine = (str?: string) => {
  return str ? str.replace(/[\\]*\\n/g, "\n") : str;
};

export const isServer = () => {
  return typeof window === "undefined" && typeof global !== "undefined";
};

export const isUserAuthenticated = () => {
  const userCookie = getaCookie(cookieKeys.auth);

  // Check userCookie is a string and not undefined
  if (typeof userCookie === "string") {
    const user = JSON.parse(userCookie);
    return !!user?.token;
  }
};

export const validateToken = (token: string): boolean => {
  if (!token?.trim()) return false;
  try {
    const { exp } = jwtDecode<{ exp?: number }>(token);
    return !!exp && Date.now() < exp * 1000;
  } catch {
    return false;
  }
};

export const getStrengthColor = (label: string): any => {
  switch (label) {
    case "Weak":
      return "#ff4d4f";
    case "Fair":
      return "#faad14";
    case "Good":
      return "#1677ff";
    case "Strong":
    default:
      return {
        "0%": "#00D4FF",
        "100%": "#00FF88",
      };
  }
};

export type PasswordStrengthLabel = "Weak" | "Fair" | "Good" | "Strong";

export type PasswordChecks = {
  length: boolean;
  uppercase: boolean;
  number: boolean;
  symbol: boolean;
};

export type PasswordStrengthResult = {
  score: number;
  label: PasswordStrengthLabel;
  percent: number;
  checks: PasswordChecks;
};

const PASSWORD_RULES = {
  length: (v: string) => v.length >= 8,
  uppercase: (v: string) => /[A-Z]/.test(v),
  number: (v: string) => /[0-9]/.test(v),
  symbol: (v: string) => /[!@#$%^&*]/.test(v),
} as const;

export const getPasswordStrength = (password = ""): PasswordStrengthResult => {
  const checks = Object.fromEntries(
    Object.entries(PASSWORD_RULES).map(([key, rule]) => [key, rule(password)]),
  ) as PasswordChecks;

  const score = Object.values(checks).filter(Boolean).length;

  let label: PasswordStrengthLabel;
  if (score <= 1) label = "Weak";
  else if (score === 2) label = "Fair";
  else if (score === 3) label = "Good";
  else label = "Strong";

  return {
    score,
    label,
    percent: Math.round((score / Object.keys(PASSWORD_RULES).length) * 100),
    checks,
  };
};

const normalizeForEmail = (text: string): string => {
  if (!text) return "";

  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/'/g, "")
    .replace(/[^a-z0-9\-]/g, "");
};
export const generateEmail = (firstName: string, lastName: string): string => {
  const normalizedFirst = normalizeForEmail(firstName);
  const normalizedLast = normalizeForEmail(lastName);

  if (!normalizedFirst || !normalizedLast) {
    return "";
  }

  const timestamp = Math.floor(Date.now() / 1000);

  return `${normalizedFirst}.${normalizedLast}+${timestamp}@digitalscan.com`;
};

export const formatChatTime = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const msgDate = new Date(date);
  const msgDay = new Date(
    msgDate.getFullYear(),
    msgDate.getMonth(),
    msgDate.getDate(),
  );
  const timeStr = msgDate.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const diffDays = Math.floor(
    (today.getTime() - msgDay.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return timeStr;
  if (diffDays === 1) return `Yesterday ${timeStr}`;
  if (diffDays < 7)
    return `${msgDate.toLocaleDateString(undefined, { weekday: "short" })} ${timeStr}`;
  return msgDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatTScoreData = (tscore: number[] = []) => ({
  "Take Charge": tscore[0] || 0,
  "Fast-Paced": tscore[2] || 0,
  "Risk Taker": tscore[6] || 0,
  Creative: tscore[7] || 0,
  Planned: tscore[3] || 0,
  Skeptical: tscore[4] || 0,
  Anchored: tscore[7] || 0,
  Reserved: tscore[1] || 0,
  Outgoing: tscore[1] || 0,
  Cooperative: tscore[0] || 0,
  Patient: tscore[2] || 0,
  Trusting: tscore[4] || 0,
  Cautious: tscore[6] || 0,
  Spontaneous: tscore[3] || 0,
  Content: tscore[5] || 0,
});

export const buildWorkTalentsInsights = (
  workTalentsData: any,
): { [key: string]: string } => {
  if (!workTalentsData) {
    return {};
  }

  return {
    "Results vs Relationships":
      workTalentsData.resultsVsRelationships?.description || "",
    "Daring vs Careful": workTalentsData.daringVsCareful?.description || "",
    "Abstract vs Concrete":
      workTalentsData.abstractVsConcrete?.description || "",
    "Systematic vs Flexible":
      workTalentsData.systematicVsFlexible?.description || "",
    "Promoting vs Operating":
      workTalentsData.promotingVsOperating?.description || "",
  };
};

export type FieldType = {
  firstname: string;
  lastname: string;
  email: string;
  companyName?: string;
};

export const defaultInitial: FieldType = {
  firstname: "",
  lastname: "",
  email: "",
  companyName: "",
};

export function isSameValues(a: FieldType, b: FieldType): boolean {
  return (
    (a?.firstname ?? "") === (b?.firstname ?? "") &&
    (a?.lastname ?? "") === (b?.lastname ?? "") &&
    (a?.email ?? "") === (b?.email ?? "") &&
    (a?.companyName ?? "") === (b?.companyName ?? "")
  );
}
export const normalizedKey = (key?: string) => {
  if (!key) return "";
  return key.replace(/[\s-]+/g, "");
};

export const formatDays = (count: number, includeCount = true): string => {
  const label = count === 1 ? "day" : "days";
  return includeCount ? `${count} ${label}` : label;
};
