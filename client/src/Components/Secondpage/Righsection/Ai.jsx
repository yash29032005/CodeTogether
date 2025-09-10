import React, { useState, useEffect, useRef } from "react";

export default function Ai() {
  // State for input message
  const [message, setMessage] = useState("");

  // State for chat messages (initialized with AI greeting)
  const [messages, setMessages] = useState([
    {
      username: "AI",
      message: "👋 Hi! I can help you with anything related to travelling",
      timestamp: new Date().toISOString(),
    },
  ]);

  // Ref to always scroll to the latest message
  const messagesEndRef = useRef(null);

  // Auto-scroll whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Send message handler
  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent sending empty messages

    const timestamp = new Date().toISOString();

    // User message object
    const userMsg = {
      username: "You",
      message,
      timestamp,
    };

    // Add user's message to state
    setMessages((prev) => [...prev, userMsg]);
    setMessage(""); // Clear input

    try {
      // API call to backend
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt: message }),
      });

      // Handle rate limiting (HTTP 429)
      if (res.status === 429) {
        const aiMsg = {
          username: "AI",
          message:
            "⏳ Rate limit reached. Please wait a bit before trying again.",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        return;
      }

      // Parse API response
      const data = await res.json();

      // AI reply object
      const aiMsg = {
        username: "AI",
        message: data.result || "No response",
        timestamp: new Date().toISOString(),
      };

      // Add AI's message to state
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI fetch error:", err);

      // Error fallback message
      const aiMsg = {
        username: "AI",
        message: "⚠️ Error connecting to AI. Please try again later.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    }
  };

  // Format timestamps into hh:mm
  const formatTime = (isoTime) => {
    if (!isoTime) return "";
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[93%] md:h-full w-full">
      {/* Chat messages */}
      <div className="overflow-y-auto p-2 flex-1">
        {messages.map((m, i) => {
          const isOwn = m.username === "You"; // Check if it's user message
          const isLast = i === messages.length - 1; // Track last message for auto-scroll

          return (
            <div
              key={i}
              ref={isLast ? messagesEndRef : null}
              className={`chat ${isOwn ? "chat-end" : "chat-start"} mb-2`}
            >
              {/* Avatar circle */}
              <div className="chat-image">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white 
                    font-bold uppercase bg-gradient-to-r from-purple-950 to-green-800`}
                >
                  {isOwn ? m.username.charAt(0) : "AI"}
                </div>
              </div>

              {/* Username label */}
              <div className="chat-header">{m.username}</div>

              {/* Chat bubble */}
              <div
                className={`chat-bubble text-sm ${
                  isOwn ? "bg-blue-950 text-white" : "bg-gray-600 text-white"
                } break-words overflow-wrap-anywhere whitespace-pre-wrap font-mono`}
              >
                {m.message}
              </div>

              {/* Timestamp */}
              <div className="chat-footer opacity-50">
                {formatTime(m.timestamp)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input area */}
      <div className="p-2 gap-2 w-full flex">
        <textarea
          className="flex-1 min-w-0 bg-gray-900 text-white p-2 rounded-2xl resize-none h-[40px] whitespace-pre-wrap"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type..."
          // Send message on Enter (Shift+Enter for new line)
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
        />
        <button
          className="p-2 bg-gray-900 text-white rounded-2xl"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
