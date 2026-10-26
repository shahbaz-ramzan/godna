"use client";

import { Sparkles, X } from "lucide-react";

const ChatHeader = ({ onClose }: { readonly onClose: () => void }) => (
  <div className="gene-ai-chatbot-header">
    <div className="gene-ai-chatbot-header-left">
      <div className="gene-ai-chatbot-header-icon">
        <Sparkles className="gene-ai-chatbot-header-icon-svg" />
      </div>
      <div>
        <h3 className="gene-ai-chatbot-title">GeneAI</h3>
        <span className="gene-ai-chatbot-subtitle">Here to help</span>
      </div>
    </div>
    <div className="gene-ai-chatbot-header-actions">
      <button
        type="button"
        onClick={onClose}
        className="gene-ai-chatbot-close"
        aria-label="Close chat"
      >
        <X className="gene-ai-chatbot-close-icon" />
      </button>
    </div>
  </div>
);

export default ChatHeader;
