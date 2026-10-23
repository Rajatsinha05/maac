"use client";

import { useMemo, useState } from "react";
import { quizQuestions } from "@/app/lib/data";
import { useLead } from "@/app/components/lead-context";
import { IconArrow, IconClose } from "@/app/components/icons";

export function CareerQuiz() {
  const { quizOpen, closeQuiz, openLead } = useLead();
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<string[]>([]);

  const current = quizQuestions[step];
  const done = step >= quizQuestions.length;

  const result = useMemo(() => {
    const interest = quizQuestions[0].options.find((o) => o.id === picks[0]);
    const path = quizQuestions[1].options.find((o) => o.id === picks[1]);
    const course = interest?.course ?? "3D Animation (AD3D Edge Plus)";
    const track =
      path?.id === "indie"
        ? "CreatorX"
        : path?.id === "studio"
          ? "CareerX"
          : "CareerX + CreatorX";
    const score = path?.id === "both" ? 35 : 30;
    return { course, track, score };
  }, [picks]);

  if (!quizOpen) return null;

  function choose(id: string) {
    const next = [...picks.slice(0, step), id];
    setPicks(next);
    setStep(step + 1);
  }

  function resetAndClose() {
    setStep(0);
    setPicks([]);
    closeQuiz();
  }

  return (
    <div className="fixed inset-0 z-[65] flex items-center justify-center p-3 pb-20">
      <button
        aria-label="Close quiz"
        className="absolute inset-0 bg-black/75"
        onClick={resetAndClose}
        type="button"
      />
      <div className="relative w-full max-w-md rounded-3xl border border-amber-500/40 bg-[#110e17] p-5">
        <button
          aria-label="Close"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300"
          onClick={resetAndClose}
          type="button"
        >
          <IconClose className="h-4 w-4" />
        </button>
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
          60-second career matcher
        </p>
        {!done && current ? (
          <>
            <div className="mt-3 mb-4 flex gap-1.5">
              {quizQuestions.map((q, i) => (
                <span
                  key={q.id}
                  className={`h-1 flex-1 rounded-full ${i <= step ? "bg-amber-400" : "bg-zinc-700"}`}
                />
              ))}
            </div>
            <h3 className="mb-4 font-display text-xl font-black text-white">
              {current.prompt}
            </h3>
            <div className="space-y-2">
              {current.options.map((option) => (
                <button
                  key={option.id}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-left text-sm font-semibold text-white hover:border-amber-400"
                  onClick={() => choose(option.id)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h3 className="mt-2 font-display text-2xl font-black text-white">
              You match {result.track}
            </h3>
            <p className="mt-2 text-sm text-zinc-300">
              Recommended program:{" "}
              <span className="font-bold text-amber-300">{result.course}</span>
            </p>
            <div className="my-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-center">
              <p className="text-[10px] uppercase tracking-widest text-amber-400">
                Indicative scholarship score
              </p>
              <p className="font-display text-4xl font-black text-white">
                {result.score}%
              </p>
              <p className="text-[11px] text-zinc-400">
                Final waiver confirmed after counseling. Valid till 31 Oct 2026.
              </p>
            </div>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 py-3 text-sm font-extrabold uppercase text-black"
              onClick={() => {
                resetAndClose();
                openLead({ course: result.course, source: "quiz" });
              }}
              type="button"
            >
              Lock this track
              <IconArrow className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
