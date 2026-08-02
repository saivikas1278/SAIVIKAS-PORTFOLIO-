"use client";

import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

export default function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError({ ...error, required: false });
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!userInput.email || !userInput.message || !userInput.name) {
      setError({ ...error, required: true });
      return;
    } else if (error.email) {
      return;
    } else {
      setError({ ...error, required: false });
    }

    try {
      setIsLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/contact`,
        userInput
      );

      toast.success("Message sent successfully!");
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send message.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-6 lg:p-8 w-full">
      <div className="space-y-2 mb-6">
        <span className="text-xs font-mono text-primary uppercase tracking-widest">// contact_channel</span>
        <h3 className="text-xl font-bold text-white">Send a Message</h3>
        <p className="text-xs text-muted leading-relaxed">
          I am always open to discussing new opportunities, full-stack roles, or collaborative projects.
        </p>
      </div>

      <form onSubmit={handleSendMail} className="space-y-4">
        {/* Name Input */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-muted uppercase">Your Name</label>
          <input
            className="glass-input w-full rounded-lg px-4 py-2.5 text-sm"
            type="text"
            maxLength="100"
            required
            onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
            onBlur={checkRequired}
            value={userInput.name}
            placeholder="John Doe"
          />
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-muted uppercase">Your Email</label>
          <input
            className="glass-input w-full rounded-lg px-4 py-2.5 text-sm"
            type="email"
            maxLength="100"
            required
            value={userInput.email}
            onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
            onBlur={() => {
              checkRequired();
              setError({ ...error, email: !isValidEmail(userInput.email) });
            }}
            placeholder="john@example.com"
          />
          {error.email && (
            <p className="text-xs text-red-400 mt-1 font-mono">
              Please enter a valid email address.
            </p>
          )}
        </div>

        {/* Message Textarea */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-muted uppercase">Your Message</label>
          <textarea
            className="glass-input w-full rounded-lg px-4 py-2.5 text-sm"
            maxLength="500"
            required
            onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
            onBlur={checkRequired}
            rows="4"
            value={userInput.message}
            placeholder="Hello, I would like to discuss a project with you..."
          />
        </div>

        {/* Footer & Submit */}
        <div className="pt-2 flex flex-col gap-3">
          {error.required && (
            <p className="text-xs text-red-400 font-mono text-center">
              All fields are required.
            </p>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="relative group w-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-primary rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative w-full py-3 bg-bg-base hover:bg-bg-base/80 rounded-lg text-xs font-mono uppercase tracking-wider text-white flex items-center justify-center gap-2 transition duration-200 cursor-pointer">
              {isLoading ? (
                <span>Transmitting Data...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <TbMailForward size={16} className="text-primary" />
                </>
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}