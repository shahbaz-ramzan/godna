"use client";

import { useLoggedPersonName } from "@/hooks/useLoggedPersonName";
import {
  buildWorkTalentsInsights,
  formatChatTime,
  formatTScoreData,
} from "@/lib/utils";
import { RootState } from "@/store";
import { Check, Copy, Send, Sparkles } from "lucide-react";
import { type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./chatHeader";
import LoadingThreeDots from "./loadingThreeDots";
import TypewriterText from "./typewriterText";

import type {
  ChatMessage,
  GeneAIChatbotProps,
  WonderchatResponse,
} from "./types";

const CHATBOT_ID = "cmawxvc970d3j12y77gb78xnw";
const WONDERCHAT_CHAT_URL = "https://app.wonderchat.io/api/v1/chat";
const CHATBOT_CONTEXT =
  "You are a DNA Behavior Assistant analyzing user behavior patterns and providing insights.";

const postToWonderchat = async (
  payload: Record<string, unknown>,
): Promise<WonderchatResponse> => {
  const res = await fetch(WONDERCHAT_CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json() as Promise<WonderchatResponse>;
};

// ─── useGeneAIChat ────────────────────────────────────────────────────────────

function useGeneAIChat(externalPayload?: Record<string, unknown> | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  const [chatlogId, setChatlogId] = useState<string | null>(null);
  const isProcessingRef = useRef(false);

  const loggedPersonName = useLoggedPersonName();
  const {
    uniqueStyleAndDescription,
    strongestFactor,
    bdna5Scores,
    tscoreData,
  } = useSelector((state: RootState) => ({
    uniqueStyleAndDescription: state.report.uniqueStyleAndDescription,
    strongestFactor: state.report.strongestFactor,
    bdna5Scores: state.report.bdna5Scores,
    tscoreData: state.report.tscoreData,
  }));

  const reduxPayload = useMemo(
    () => ({
      personName: loggedPersonName,
      reportType: "Participant Business Report",
      personID: uniqueStyleAndDescription?.personID,
      behaviorTypeID: uniqueStyleAndDescription?.behaviorTypeID,
      behaviorTypeName: uniqueStyleAndDescription?.behaviorTypeName,
      behaviorTypeDescription:
        uniqueStyleAndDescription?.behaviorTypeDescription,
      twoStrongestTraits: strongestFactor,
      insights: buildWorkTalentsInsights(bdna5Scores),
      tScores: formatTScoreData(tscoreData?.tscore),
    }),
    [
      loggedPersonName,
      uniqueStyleAndDescription?.personID,
      uniqueStyleAndDescription?.behaviorTypeID,
      uniqueStyleAndDescription?.behaviorTypeName,
      uniqueStyleAndDescription?.behaviorTypeDescription,
      strongestFactor,
      bdna5Scores,
      tscoreData?.tscore,
    ],
  );

  // undefined = no external mode, use redux payload (main /report route)
  // null = external mode but still loading, block the fetch until data arrives
  // object = valid external payload, use it
  const chatPayload = externalPayload === undefined ? reduxPayload : externalPayload;

  const hasValidPayload = useMemo(() => {
    if (!chatPayload || !chatPayload.personName) return false;
    const tscore = chatPayload.tScores;
    if (tscore && typeof tscore === "object") {
      return Object.values(tscore as Record<string, unknown>).some(
        (score) => score != null && score !== 0,
      );
    }
    return true;
  }, [chatPayload]);

  // Prefetch the opening message as soon as payload is valid, before the user opens the chatbot
  useEffect(() => {
    if (initialLoadDone || isProcessingRef.current || !hasValidPayload) return;

    const fetchInitialMessage = async () => {
      isProcessingRef.current = true;
      setIsLoading(true);

      const loadingMsgId = `loading-${Date.now()}`;
      setMessages([
        {
          id: loadingMsgId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);

      try {
        const data = await postToWonderchat({
          chatbotId: CHATBOT_ID,
          question: JSON.stringify(chatPayload),
          context: CHATBOT_CONTEXT,
        });

        if (data.chatlogId) setChatlogId(data.chatlogId);

        setMessages([
          {
            id: data.id ?? String(Date.now() + 1),
            role: "assistant",
            content:
              data.response ?? "I couldn't get a response. Please try again.",
            timestamp: new Date(),
            sources: data.sources,
          },
        ]);
      } catch (err) {
        console.error("Chat API error:", err);
        setMessages([
          {
            id: String(Date.now() + 1),
            role: "assistant",
            content: "Something went wrong. Please try again.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
        setInitialLoadDone(true);
        isProcessingRef.current = false;
      }
    };

    void fetchInitialMessage();
  }, [initialLoadDone, hasValidPayload, chatPayload]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const loadingMsgId = `loading-${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      },
      {
        id: loadingMsgId,
        role: "assistant",
        content: "",
        timestamp: new Date(),
      },
    ]);
    setIsLoading(true);

    try {
      const data = await postToWonderchat({
        chatbotId: CHATBOT_ID,
        question: trimmed,
        chatlogId: chatlogId ?? undefined,
        context: CHATBOT_CONTEXT,
      });

      if (data.chatlogId) setChatlogId(data.chatlogId);

      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsgId
            ? {
                id: data.id ?? String(Date.now() + 1),
                role: "assistant" as const,
                content:
                  data.response ??
                  "I couldn't get a response. Please try again.",
                timestamp: new Date(),
                sources: data.sources,
              }
            : m,
        ),
      );
    } catch (err) {
      console.error("Chat API error:", err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsgId
            ? { ...m, content: "Something went wrong. Please try again." }
            : m,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
}

// ─── MessageBubble ────────────────────────────────────────────────────────────

function MessageBubble({
  msg,
  isLastAssistant,
  isLoading,
  isCopied,
  onCopy,
}: {
  readonly msg: ChatMessage;
  readonly isLastAssistant: boolean;
  readonly isLoading: boolean;
  readonly isCopied: boolean;
  readonly onCopy: () => void;
}) {
  const bubbleContent =
    msg.role === "user" ? (
      msg.content
    ) : msg.content === "" && isLoading ? (
      <LoadingThreeDots />
    ) : (
      <TypewriterText content={msg.content} animate={isLastAssistant} />
    );

  return (
    <div
      className={`gene-ai-chatbot-message gene-ai-chatbot-message--${msg.role}`}
    >
      {msg.role === "assistant" && (
        <div className="gene-ai-chatbot-message-avatar" aria-hidden>
          <Sparkles className="gene-ai-chatbot-message-avatar-icon" />
        </div>
      )}
      <div className="gene-ai-chatbot-message-inner">
        <div className="gene-ai-chatbot-message-bubble">{bubbleContent}</div>
        <div className="gene-ai-chatbot-message-meta">
          <span className="gene-ai-chatbot-message-time">
            {formatChatTime(msg.timestamp)}
          </span>
          {msg.role === "assistant" && (
            <button
              type="button"
              className="gene-ai-chatbot-message-copy"
              onClick={onCopy}
              aria-label={isCopied ? "Copied" : "Copy response"}
              title={isCopied ? "Copied" : "Copy"}
            >
              {isCopied ? (
                <Check className="gene-ai-chatbot-message-copy-icon" />
              ) : (
                <Copy className="gene-ai-chatbot-message-copy-icon" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MessageList ──────────────────────────────────────────────────────────────

function MessageList({
  messages,
  isLoading,
  copiedMessageId,
  onCopy,
  messagesEndRef,
}: {
  readonly messages: ChatMessage[];
  readonly isLoading: boolean;
  readonly copiedMessageId: string | null;
  readonly onCopy: (id: string, content: string) => void;
  readonly messagesEndRef: RefObject<HTMLDivElement>;
}) {
  const lastAssistantIndex = messages.findLastIndex(
    (m) => m.role === "assistant",
  );

  return (
    <div className="gene-ai-chatbot-messages">
      {messages.map((msg, index) => (
        <MessageBubble
          key={msg.id}
          msg={msg}
          isLastAssistant={index === lastAssistantIndex}
          isLoading={isLoading}
          isCopied={copiedMessageId === msg.id}
          onCopy={() => onCopy(msg.id, msg.content)}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

// ─── ChatInput ────────────────────────────────────────────────────────────────

function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
}: {
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly onSend: () => void;
  readonly disabled: boolean;
}) {
  return (
    <div className="gene-ai-chatbot-input-wrap">
      <input
        type="text"
        placeholder="Ask about your report..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && onSend()}
        className="gene-ai-chatbot-input"
        disabled={disabled}
      />
      <button
        type="button"
        onClick={onSend}
        className="gene-ai-chatbot-send"
        aria-label="Send message"
        disabled={disabled}
      >
        <Send className="gene-ai-chatbot-send-icon" />
      </button>
    </div>
  );
}

// ─── GeneAIChatbot ────────────────────────────────────────────────────────────

const GeneAIChatbot = ({
  open,
  onClose,
  externalPayload,
}: GeneAIChatbotProps) => {
  const [inputValue, setInputValue] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useGeneAIChat(externalPayload);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    void sendMessage(inputValue);
    setInputValue("");
  };

  const handleCopy = (messageId: string, content: string) => {
    void navigator.clipboard.writeText(content);
    setCopiedMessageId(messageId);
    setTimeout(() => setCopiedMessageId(null), 1500);
  };

  if (!open) return null;

  return (
    <dialog
      open={open}
      className="gene-ai-chatbot"
      aria-label="GeneAI Chat"
      onCancel={onClose}
    >
      <div className="gene-ai-chatbot-window">
        <ChatHeader onClose={onClose} />
        <MessageList
          messages={messages}
          isLoading={isLoading}
          copiedMessageId={copiedMessageId}
          onCopy={handleCopy}
          messagesEndRef={messagesEndRef}
        />
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          disabled={isLoading}
        />
      </div>
    </dialog>
  );
};

export default GeneAIChatbot;
