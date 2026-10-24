"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const inputBase =
    "w-full border hairline bg-transparent px-4 py-3 text-sm placeholder:text-fg-faint focus:outline-none focus:ring-1 focus:ring-fg-faint transition-all duration-200";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 w-full max-w-xl"
      noValidate
    >
      <div className="flex flex-col gap-4">
        {/* Name + Email row */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            id="contact-name"
            type="text"
            placeholder="Your name"
            required
            value={form.name}
            onChange={set("name")}
            className={inputBase}
          />
          <input
            id="contact-email"
            type="email"
            placeholder="your@email.com"
            required
            value={form.email}
            onChange={set("email")}
            className={inputBase}
          />
        </div>

        {/* Message */}
        <textarea
          id="contact-message"
          placeholder="Tell me about your project..."
          required
          rows={5}
          value={form.message}
          onChange={set("message")}
          className={`${inputBase} resize-none`}
        />

        {/* Submit */}
        <div className="flex items-center gap-6">
          <button
            id="contact-submit"
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="border hairline px-7 py-3 text-xs uppercase tracking-widest2 transition-colors duration-300 hover:bg-fg hover:text-bg disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "sending"
              ? "Sending…"
              : status === "sent"
              ? "Message Sent ✓"
              : "Send Message"}
          </button>

          {status === "error" && (
            <span className="text-xs text-red-500">{errMsg}</span>
          )}
        </div>
      </div>
    </form>
  );
}
