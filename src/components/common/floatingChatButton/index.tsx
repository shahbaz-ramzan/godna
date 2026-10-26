"use client";

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton = ({ onClick }: FloatingChatButtonProps) => (
  <button className="floating-chat-btn" aria-label="Open chat" onClick={onClick}>
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bubble body with bottom-left tail */}
      <path
        d="M22 0H4C1.8 0 0 1.8 0 4V15C0 17.2 1.8 19 4 19H7V24L12 19H22C24.2 19 26 17.2 26 15V4C26 1.8 24.2 0 22 0Z"
        fill="white"
      />
      {/* Three evenly spaced dots */}
      <circle cx="8" cy="10" r="2" fill="#222" />
      <circle cx="13" cy="10" r="2" fill="#222" />
      <circle cx="18" cy="10" r="2" fill="#222" />
    </svg>
  </button>
);

export default FloatingChatButton;
