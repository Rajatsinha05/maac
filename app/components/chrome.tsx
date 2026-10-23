"use client";

import { FormEvent, useState } from "react";
import { EMAIL, MOBILE } from "@/app/lib/data";
import { useLead } from "@/app/components/lead-context";
import { LeadForm } from "@/app/components/lead-form";
import { IconBolt, IconClose, IconHeadset, IconPhone } from "@/app/components/icons";

export function LeadPopup() {
  const { leadOpen, closeLead, source } = useLead();
  if (!leadOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 pb-24 sm:p-6">
      <button
        aria-label="Close enquiry popup"
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={closeLead}
        type="button"
      />
      <div
        className="relative max-h-[88vh] w-full max-w-md overflow-y-auto rounded-[28px] border border-amber-400/30 bg-[#110e17] p-5 shadow-[0_30px_80px_-20px_rgba(192,9,43,0.45)] sm:p-6"
        role="dialog"
        aria-labelledby="popup-title"
      >
        <button
          aria-label="Close"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300"
          onClick={closeLead}
          type="button"
        >
          <IconClose className="h-4 w-4" />
        </button>
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1">
          <span className="h-2 w-2 animate-ping rounded-full bg-amber-400" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
            Auto scholarship desk
          </span>
        </div>
        <h2 id="popup-title" className="font-display text-2xl font-black text-white sm:text-3xl">
          Claim up to <span className="gold-gradient-text">35% off</span>
        </h2>
        <p className="mt-1 mb-4 text-sm leading-relaxed text-zinc-400">
          Bharat Creator Scholarship is open till 31 Oct 2026. Drop your details
          and a counselor will lock your seat
          {source === "popup" ? " — this window popped up so you don’t miss it." : "."}
        </p>
        <LeadForm idPrefix="popup" />
      </div>
    </div>
  );
}

export function StickyBottomBar() {
  const { openLead } = useLead();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4">
      <div className="pointer-events-auto mx-auto flex max-w-lg items-center gap-2 rounded-full border border-white/10 bg-zinc-950/90 p-1.5 shadow-[0_-12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <a
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-700/80 bg-zinc-900 py-3 text-xs font-bold text-white sm:text-sm"
          href={`tel:${MOBILE}`}
        >
          <IconPhone className="h-4 w-4 text-amber-400" />
          Call
        </a>
        <button
          className="flex flex-[1.35] items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 py-3 text-xs font-black uppercase tracking-wider text-black shadow-gold-glow sm:text-sm"
          onClick={() => openLead({ source: "cta" })}
          type="button"
        >
          <IconBolt className="h-4 w-4" />
          Apply 35% Off
        </button>
      </div>
    </div>
  );
}

export function ChatWidget() {
  const { chatOpen, toggleChat, closeChat, openLead } = useLead();
  const [message, setMessage] = useState("");

  function send(event: FormEvent) {
    event.preventDefault();
    openLead({ source: "chat" });
    closeChat();
    setMessage("");
  }

  return (
    <aside className="fixed bottom-24 right-3 z-50 sm:bottom-28 sm:right-5">
      {chatOpen ? (
        <div className="mb-3 w-[min(86vw,280px)] rounded-2xl border border-zinc-700 bg-zinc-950 p-3 shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-bold text-white">MAAC Ask Me</p>
            <button aria-label="Close chat" onClick={closeChat} type="button">
              <IconClose className="h-4 w-4 text-zinc-400" />
            </button>
          </div>
          <p className="mb-3 rounded-xl bg-zinc-900 p-2 text-[11px] leading-relaxed text-zinc-300">
            Hi! Tell me your city or the course you like — I&apos;ll connect a
            counselor and check 35% scholarship eligibility.
          </p>
          <form className="flex gap-1.5" onSubmit={send}>
            <input
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-2 py-2 text-[11px] text-white outline-none"
              placeholder="Type a message…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="rounded-lg bg-amber-400 px-2.5 text-[11px] font-bold text-black"
              type="submit"
            >
              Send
            </button>
          </form>
          <p className="mt-2 text-[9px] text-zinc-500">{EMAIL}</p>
        </div>
      ) : null}
      <button
        className="ml-auto flex items-center gap-1.5"
        onClick={toggleChat}
        type="button"
      >
        <span className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10px] font-extrabold uppercase text-black shadow-lg">
          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500" />
          Ask Me
        </span>
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-500 bg-gradient-to-tr from-zinc-900 to-zinc-700 shadow-xl">
          <IconHeadset className="h-5 w-5 text-amber-400" />
        </span>
      </button>
    </aside>
  );
}
