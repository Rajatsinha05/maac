"use client";

import { FormEvent, useEffect, useState } from "react";
import { programOptions } from "@/app/lib/data";
import { useLead } from "@/app/components/lead-context";
import { IconArrow, IconCheck } from "@/app/components/icons";

type LeadFormProps = {
  idPrefix?: string;
};

export function LeadForm({ idPrefix = "lead" }: LeadFormProps) {
  const { defaultCourse, markSubmitted, submitted, source } = useLead();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [program, setProgram] = useState(defaultCourse);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProgram(defaultCourse);
  }, [defaultCourse]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 3) {
      setError("Please enter your full name.");
      return;
    }
    if (digits.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: digits,
          program,
          source,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Could not submit. Please try again.");
        return;
      }
      setDone(true);
      markSubmitted();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (done || submitted) {
    return (
      <div className="rounded-2xl border border-amber-500/30 bg-zinc-900/80 p-5 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-black">
          <IconCheck className="h-6 w-6" />
        </div>
        <h3 className="text-display text-lg font-bold text-white">
          Application received
        </h3>
        <p className="text-body mt-1 text-sm text-zinc-400">
          A MAAC career counselor will call you shortly to confirm scholarship
          eligibility and the nearest centre.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-zinc-700/80 bg-zinc-900 px-3.5 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-amber-400 focus:ring-1 focus:ring-amber-400";

  return (
    <form className="space-y-3" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="source" value={source} />
      <div>
        <label
          className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-zinc-300"
          htmlFor={`${idPrefix}-name`}
        >
          Full Name *
        </label>
        <input
          id={`${idPrefix}-name`}
          className={field}
          placeholder="e.g. Arjun Mehta"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
      </div>
      <div>
        <label
          className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-zinc-300"
          htmlFor={`${idPrefix}-phone`}
        >
          Mobile Number *
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-zinc-500">
            +91
          </span>
          <input
            id={`${idPrefix}-phone`}
            className={`${field} pl-12`}
            placeholder="98765 43210"
            inputMode="numeric"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label
          className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-zinc-300"
          htmlFor={`${idPrefix}-program`}
        >
          Select Program *
        </label>
        <select
          id={`${idPrefix}-program`}
          className={field}
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        >
          {programOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      {error ? (
        <p className="text-xs font-semibold text-red-400">{error}</p>
      ) : null}
      <p className="text-body pt-1 text-xs text-zinc-400">
        By submitting, you agree to MAAC&apos;s{" "}
        <a
          className="text-amber-400 underline"
          href="https://www.maacindia.com/"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>{" "}
        and authorize advisors to connect via call/WhatsApp.
      </p>
      <button
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 py-3.5 text-sm font-bold uppercase tracking-[0.04em] text-neutral-950 shadow-gold-glow transition active:scale-[0.98] disabled:opacity-60"
        disabled={loading}
        type="submit"
      >
        {loading ? "Submitting…" : "Submit & Claim Scholarship"}
        {!loading ? <IconArrow className="h-4 w-4" /> : null}
      </button>
    </form>
  );
}
