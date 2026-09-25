"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Message {
  sender: "user" | "bot" | "admin";
  content: string;
}
interface RawMessage {
  sender: "user" | "bot" | "admin";
  content: string;
  id?: number;
  created_at?: string;
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("chat_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("chat_session_id", id);
  }
  return id;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", content: "Hi! Ask me anything about my work or background." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [conversationId, setConversationId] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactDismissedForSession, setContactDismissedForSession] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactError, setContactError] = useState<string | null>(null);
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  // Poll for admin replies while the widget is open
  useEffect(() => {
    if (!conversationId || !open) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/api/conversations/${conversationId}`, {
          headers: { "x-session-id": getOrCreateSessionId() },
        });

        if (!res.ok) return;

        const data = await res.json();

        setMessages((prev) => {
          if (data.messages.length > prev.length) {
           return data.messages.map((m: RawMessage) => ({
              sender: m.sender,
              content: m.content,
            }));
          }
          return prev;
        });
      } catch {
        // silently ignore polling errors
      }
    }, 9000);

    return () => clearInterval(interval);
  }, [conversationId, open]);

  // Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const res = await fetch(`${API_URL}/api/conversations/by-session`, {
          headers: { "x-session-id": getOrCreateSessionId() },
        });

        if (!res.ok) return;

        const data = await res.json();

        if (data.conversation && data.messages.length > 0) {
          const restored = data.messages.map((m: RawMessage) => ({
            sender: m.sender,
            content: m.content,
          }));
          setMessages(restored);
          setConversationId(data.conversation.id);

          if (!data.conversation.visitor_email) {
            setContactDismissedForSession(false);
          } else {
            setContactSubmitted(true);
          }
        }
      } catch {
        // silently ignore — fall back to default greeting
      }
    };

    loadHistory();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, showContactForm, open]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    if (showContactForm) {
      setShowContactForm(false);
      setContactDismissedForSession(true);
    }

    setMessages((prev) => [...prev, { sender: "user", content: trimmed }]);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": getOrCreateSessionId(),
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", content: data.reply }]);

      if (data.conversationId) {
        setConversationId(data.conversationId);
      }

      if (data.askForContact && !contactDismissedForSession && !contactSubmitted) {
        setShowContactForm(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleContactSubmit = async () => {
    setContactError(null);

    if (!contactEmail.trim() || !EMAIL_REGEX.test(contactEmail.trim())) {
      setContactError("Please enter a valid email address.");
      return;
    }

    if (!conversationId) {
      setContactError("Something went wrong. Please try again.");
      return;
    }

    setContactSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/conversations/${conversationId}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-session-id": getOrCreateSessionId(),
        },
        body: JSON.stringify({
          visitor_name: contactName.trim() || null,
          visitor_email: contactEmail.trim(),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setShowContactForm(false);
      setContactSubmitted(true);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: "Thanks, I'll be in touch!" },
      ]);
    } catch {
      setContactError("Something went wrong, try again.");
    } finally {
      setContactSubmitting(false);
    }
  };

  const handleContactDismiss = () => {
    setShowContactForm(false);
    setContactDismissedForSession(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat panel */}
      {open && (
        <div className="mb-4 flex h-[70vh] max-h-[600px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-2xl border border-gray-800 bg-[#0B0F19] shadow-2xl shadow-black/50">
          <div className="flex items-center justify-between border-b border-gray-800 px-4 py-3">
            <h2 className="text-sm font-semibold text-white">Chat with me</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 transition hover:text-white"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "rounded-br-sm bg-blue-600 text-white"
                      : msg.sender === "admin"
                      ? "rounded-bl-sm bg-green-700 text-white"
                      : "rounded-bl-sm bg-gray-800 text-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-gray-800 px-4 py-2 text-sm text-gray-400">
                  ...
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center">
                <div className="rounded-full bg-red-950 px-3 py-1 text-xs text-red-400">
                  {error}
                </div>
              </div>
            )}

            {showContactForm && (
              <div className="flex justify-start">
                <div className="max-w-[90%] space-y-2 rounded-2xl rounded-bl-sm bg-gray-800 px-4 py-3 text-gray-100">
                  <p className="text-sm">
                    Want to leave your email so I can follow up personally?
                  </p>

                  <input
                    type="text"
                    placeholder="Name (optional)"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    disabled={contactSubmitting}
                    className="w-full rounded-lg bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                  />

                  <input
                    type="email"
                    placeholder="Email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    disabled={contactSubmitting}
                    className="w-full rounded-lg bg-gray-900 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
                  />

                  {contactError && (
                    <p className="text-xs text-red-400">{contactError}</p>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={handleContactSubmit}
                      disabled={contactSubmitting}
                      className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                    >
                      {contactSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      onClick={handleContactDismiss}
                      disabled={contactSubmitting}
                      className="flex-1 rounded-lg bg-gray-700 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600 disabled:opacity-50"
                    >
                      No thanks
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-gray-800 bg-gray-900 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={loading}
              className="flex-1 rounded-full bg-gray-800 px-4 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              aria-label="Send message"
              className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-transform hover:scale-105 hover:bg-blue-700"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}