import React, { useState, useEffect, useContext, useRef } from "react";
import socket from "../../../Socket/socket";
import { ChatContext } from "../../../Context/MessageContext";
import { useSearchParams } from "react-router-dom";

export default function Chat() {
  const [message, setMessage] = useState("");
  const { messages, setMessages } = useContext(ChatContext);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const username = searchParams.get("username");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.emit("join-room", { roomId, username });

    socket.on("chat-history", (history) => {
      setMessages(history);
    });

    socket.on("chat-update", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat-history");
      socket.off("chat-update");
    };
  }, [roomId, username, setMessages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const timestamp = new Date().toISOString();
    socket.emit("chat-message", { roomId, username, message, timestamp });
    setMessage("");
  };

  const formatTime = (isoTime) => {
    if (!isoTime) return "";
    const date = new Date(isoTime);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-[93%] md:h-full w-full">
      {/* Messages */}
      <div className="overflow-y-auto p-2 flex-1">
        {messages.map((m, i) => {
          const isOwn = m.username === username;
          const isLast = i === messages.length - 1;

          return (
            <div
              key={i}
              ref={isLast ? messagesEndRef : null}
              className={`chat ${isOwn ? "chat-end" : "chat-start"} mb-2`}
            >
              {/* Avatar */}
              <div className="chat-image">
                <div
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-950 
                to-green-800 flex items-center justify-center text-white font-bold uppercase"
                >
                  {m.username.charAt(0)}
                </div>
              </div>

              {/* Header */}
              <div className="chat-header">{m.username}</div>

              {/* Bubble */}
              <div
                className={`chat-bubble text-sm  ${
                  isOwn ? "bg-gray-600 text-white" : "bg-blue-950 text-white"
                } break-words overflow-wrap-anywhere whitespace-pre-wrap font-mono`}
              >
                {m.message}
              </div>

              {/* Footer */}
              <div className="chat-footer opacity-50">
                {formatTime(m.timestamp)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input & Send Button */}
      <div className="p-2 gap-2 w-full flex">
        <textarea
          className="flex-1 min-w-0 bg-gray-900 text-white p-2 rounded-2xl resize-none h-[40px] 
          whitespace-pre-wrap flex"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
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
