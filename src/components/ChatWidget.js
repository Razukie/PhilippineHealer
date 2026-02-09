import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import { MessageCircle } from "lucide-react";

// scriptedResponses.js
export const scriptedResponses = [
  // GREETINGS
  { category: "greeting", keywords: ["hello", "hi", "hey"], reply: "Hello! How can I assist you today?" },
  { category: "greeting", keywords: ["good morning"], reply: "Good morning! How can I help you today?" },
  { category: "greeting", keywords: ["good afternoon"], reply: "Good afternoon! How can I help you today?" },
  { category: "greeting", keywords: ["good evening"], reply: "Good evening! How can I help you today?" },

  // APPOINTMENTS (example 20 entries, replicate to 100+)
  { category: "appointment", keywords: ["booking", "appointment"], reply: "You can book a session via our booking page." },
  { category: "appointment", keywords: ["how to book"], reply: "Select your desired date and time, then confirm your appointment." },
  { category: "appointment", keywords: ["reschedule"], reply: "To reschedule, go to your booking details and choose a new time." },
  { category: "appointment", keywords: ["cancel appointment"], reply: "To cancel, click 'Cancel' on your booking page." },
  { category: "appointment", keywords: ["available slots"], reply: "Our available times are Monday to Friday, 9 AM to 6 PM." },
  { category: "appointment", keywords: ["first visit"], reply: "For first-time clients, please bring a valid ID and any forms." },
  { category: "appointment", keywords: ["duration", "time of session"], reply: "Most sessions last 1 hour." },
  { category: "appointment", keywords: ["confirmation"], reply: "You will receive a confirmation email after booking." },
  { category: "appointment", keywords: ["follow up"], reply: "We may follow up after your session for feedback." },
  { category: "appointment", keywords: ["emergency"], reply: "For urgent bookings, contact support immediately." },

  // PAYMENT (10+ entries)
  { category: "payment", keywords: ["price", "cost"], reply: "Our pricing depends on the project. Contact us for details." },
  { category: "payment", keywords: ["payment", "gcash"], reply: "You can pay securely online using GCash or credit card." },
  { category: "payment", keywords: ["refund"], reply: "Refunds are handled as per our refund policy." },
  { category: "payment", keywords: ["invoice", "receipt"], reply: "Invoices/receipts are sent via email after payment." },

  // TIME / HOURS (5+ entries)
  { category: "time", keywords: ["time", "available", "hours"], reply: "Available times: Monday to Friday, 9 AM to 6 PM." },

  // GENERAL INFO (10+ entries)
  { category: "general", keywords: ["thanks", "thank you"], reply: "You're welcome! 😊" },
  { category: "general", keywords: ["services"], reply: "We provide web design, UI/UX, and booking integration." },
  { category: "general", keywords: ["contact", "email", "phone"], reply: "Contact us at support@pixelinc.com or +123456789." },
  { category: "general", keywords: ["faq"], reply: "Check our FAQ page for common questions." },
  { category: "general", keywords: ["location", "where", "address"], reply: "Our office is located in Sagada, Mountain Province." },
];

// To scale up to 300, just replicate the same pattern:
// - Add more variations of appointment responses
// - Add more payment questions
// - Add greetings, general info, and time answers
// - Each with slightly different wording for variety


const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your support assistant. How can I help you today?", sender: 'ai' }
  ]);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSend = (e) => {
  if (e.key !== "Enter" || !input.trim()) return;

  const text = input.trim().toLowerCase();

  setMessages(prev => [...prev, { text: input, sender: 'user' }]);
  setInput('');
  setLoading(true);

  // 🔍 Find matching scripted response
  let reply = null;

  for (let item of scriptedResponses) {
    if (item.keywords.some(keyword => text.includes(keyword))) {
      reply = item.reply;
      break;
    }
  }

  // ❌ Fallback if nothing matched
  if (!reply) {
    reply = "Sorry, I didn't understand that. Could you please rephrase?";
  }

  setTimeout(() => {
    setMessages(prev => [...prev, { text: reply, sender: 'ai' }]);
    setLoading(false);
  }, 600);
};


  return (
    <div className="chat-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">Support</div>
          <div className="chat-body" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`msg-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="typing">Typing...</div>}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSend}
              disabled={loading}
            />
          </div>
        </div>
      )}
      <button
        className={`fab-modern ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        <MessageCircle size={22} strokeWidth={1.8} />
      </button>
    </div>
  );
};

export default ChatWidget;
