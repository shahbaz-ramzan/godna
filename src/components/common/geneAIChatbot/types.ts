export type ChatSource = { url: string; title: string };

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: ChatSource[];
};

export type WonderchatResponse = {
  id?: string;
  response?: string;
  chatlogId?: string;
  sources?: ChatSource[];
};

export type GeneAIChatbotProps = {
  open: boolean;
  onClose: () => void;
  externalPayload?: Record<string, unknown> | null;
};
