"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  affiliatedPlus,
  alumni,
  centresByState,
  courses,
  EMAIL,
  events,
  faqs,
  OFFICIAL_SITE,
  MOBILE,
  MOBILE_DISPLAY,
  PHONE,
  PHONE_DISPLAY,
  SCHOLARSHIP_DEADLINE,
  studentWork,
  studios,
  usps,
  whyMaac,
} from "@/app/lib/data";
import { useLead } from "@/app/components/lead-context";
import { LeadForm } from "@/app/components/lead-form";
import {
  IconArrow,
  IconAward,
  IconBolt,
  IconBriefcase,
  IconCheck,
  IconChevron,
  IconClock,
  IconCompass,
  IconMedal,
  IconPin,
  IconPlay,
  uspIcons,
} from "@/app/components/icons";

function DeadlineClock() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  if (now === null) return <span>limited seats</span>;
  const left = Math.max(0, new Date(SCHOLARSHIP_DEADLINE).getTime() - now);
  const days = Math.floor(left / 86400000);
  const hours = Math.floor((left % 86400000) / 3600000);
  const mins = Math.floor((left % 3600000) / 60000);
  return (
    <span>
      {days}d {hours}h {mins}m left
    </span>
  );
}

const badgeClass: Record<string, string> = {
  crimson: "bg-red-950/90 border-red-500/40 text-red-200",
  gold: "bg-amber-950/90 border-amber-500/40 text-amber-200",
  cyan: "bg-cyan-950/90 border-cyan-500/40 text-cyan-200",
};

const uspTone: Record<string, string> = {
  crimson: "bg-red-950/80 border-red-500/40 text-red-400",
  gold: "bg-amber-950/80 border-amber-500/40 text-amber-400",
  emerald: "bg-emerald-950/80 border-emerald-500/40 text-emerald-400",
  blue: "bg-blue-950/80 border-blue-500/40 text-blue-400",
};

function BrandMark({ size = "sm" }: { size?: "sm" | "lg" }) {
  const height = size === "lg" ? "h-[4.5rem] sm:h-20" : "h-14 sm:h-16";
  return (
    <Image
      alt="MAAC — Maya Academy of Advanced Creativity, Greater Noida"
      className={`${height} w-auto object-contain mix-blend-screen`}
      height={460}
      src="/images/maac-logo.jpg"
      width={1024}
    />
  );
}

function SectionHead({
  kicker,
  title,
  copy,
  action,
}: {
  kicker: string;
  title: ReactNode;
  copy?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl min-w-0">
        <span className="kicker">{kicker}</span>
        <h2 className="text-display mt-3 text-[1.75rem] font-bold text-white sm:text-4xl lg:text-[2.5rem]">
          {title}
        </h2>
        {copy ? (
          <p className="text-body mt-2.5 max-w-xl text-[0.9375rem] text-zinc-400 sm:text-base">
            {copy}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function Hero() {
  const { openLead } = useLead();
  return (
    <section className="relative" id="top">
      <h1 className="sr-only">
        Make your creative mark with MAAC. Bharat Creator Scholarship up to 35%
        with 10th or 12th marksheet. Valid till October 31, 2026.
      </h1>
      <button
        aria-label="Apply for Bharat Creator Scholarship — up to 35% with 10th or 12th marksheet"
        className="relative flex w-full items-center justify-center overflow-hidden bg-[#5d7a96] text-left"
        onClick={() => openLead({ source: "cta" })}
        type="button"
      >
        <Image
          alt="Make your creative mark with just your 10th or 12th marksheet. Bharat Creator Scholarship by MAAC, up to 35% merit-based. Valid till October 31, 2026."
          className="h-auto w-full max-h-[min(28rem,58vh)] object-contain"
          height={452}
          preload
          sizes="100vw"
          src="/images/campaign-banner.png"
          width={1024}
        />
      </button>
      <div className="border-b border-white/8 bg-black/80 px-4 py-2 backdrop-blur-md sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <BrandMark />
          <div className="flex min-w-0 items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-400/90 sm:inline-flex">
              <IconClock className="h-3.5 w-3.5" />
              Till 31 Oct 2026
            </span>
            <span className="hidden rounded-full border border-zinc-700 bg-zinc-900/80 px-2.5 py-1 text-xs text-amber-300 md:inline">
              <DeadlineClock />
            </span>
            <a
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/70 bg-zinc-900/80 px-3.5 py-2 text-[11px] font-semibold tracking-wide text-zinc-200 transition hover:border-amber-400/40 hover:bg-zinc-800"
              href="#courses"
            >
              <IconCompass className="h-3.5 w-3.5 text-amber-400" />
              Courses
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Statement() {
  const { openLead } = useLead();
  const panels = [
    { src: "/images/animation.jpg", label: "3D Animation", tag: "Character & story" },
    { src: "/images/content.jpg", label: "Digital Creators", tag: "Voice · edit · grow" },
    { src: "/images/gaming.jpg", label: "Game Worlds", tag: "Real-time art" },
  ];
  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-10" id="think">
      <p className="pointer-events-none absolute -right-4 top-8 font-display text-[22vw] font-bold leading-none text-white/[0.03] sm:text-[8rem] sm:-right-6 sm:top-10">
        MAAC
      </p>
      <div className="relative z-10 mx-auto max-w-6xl">
        <span className="kicker">Empower your future</span>
        <h2 className="text-display mt-4 max-w-3xl text-[1.85rem] font-bold text-white sm:text-5xl lg:text-[3.25rem]">
          Creative careers that click.
          <span className="gold-gradient-text"> Think MAAC.</span>
        </h2>
        <p className="text-body mt-4 max-w-2xl text-[0.9375rem] text-zinc-400 sm:text-base">
          Empower your future with skills that matter. Train in animation, VFX,
          gaming, and digital content creation with expert-led courses that
          prepare you for real industry success.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
          {panels.map((panel, index) => (
            <figure
              key={panel.label}
              className={`relative min-w-0 overflow-hidden rounded-[22px] border border-white/10 ${
                index === 1 ? "sm:mt-8" : index === 2 ? "sm:mt-3" : ""
              }`}
            >
              <div className="relative h-44 sm:h-56 lg:h-72">
                <Image
                  alt={panel.label}
                  className="object-cover"
                  src={panel.src}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>
              <figcaption className="absolute bottom-3 left-3 right-3">
                <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-amber-300">
                  {panel.tag}
                </span>
                <span className="font-display text-base font-bold text-white sm:text-lg">
                  {panel.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 px-6 py-3.5 text-sm font-bold tracking-[0.04em] text-black shadow-gold-glow uppercase"
            onClick={() => openLead({ source: "cta" })}
            type="button"
          >
            Enquire now
            <IconArrow className="h-4 w-4" />
          </button>
          <p className="text-body text-sm text-zinc-500 sm:max-w-sm">
            From exclusive workshops to high-impact masterclasses, MAAC events
            hone your craft and build a portfolio that stands out.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Usps() {
  return (
    <section className="border-y border-white/5 bg-[#0d0b12]/80 py-5">
      <div className="hide-scrollbar mx-auto flex max-w-6xl gap-3 overflow-x-auto px-4 sm:px-6 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-10">
        {usps.map((usp) => {
          const Icon = uspIcons[usp.icon];
          return (
            <div
              key={usp.title}
              className="flex min-w-[11.5rem] flex-shrink-0 items-center gap-3 rounded-2xl border border-white/8 bg-zinc-900/70 px-3.5 py-3 lg:min-w-0"
            >
              <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border ${uspTone[usp.tone]}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-snug text-white">{usp.title}</div>
                <div className="text-xs leading-snug text-zinc-400">{usp.subtitle}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Recruiters() {
  return (
    <section className="relative overflow-hidden border-b border-brand-border bg-zinc-950/90 px-4 py-14 sm:px-6 sm:py-20 lg:px-10" id="placements">
      <div className="pointer-events-none absolute -left-16 top-1/2 h-48 w-48 rounded-full bg-brand-crimson/20 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHead
          kicker="Your launchpad to the industry"
          title={
            <>
              You don&apos;t just train here —{" "}
              <span className="gold-gradient-text">you get ready to lead.</span>
            </>
          }
          copy="You get hired because you're ready from day one, with real skills and industry-driven training. Studio partners highlighted on maacindia.com."
          action={
            <span className="rounded-full border border-zinc-700/70 bg-zinc-900 px-3 py-1.5 text-xs font-bold text-amber-400">
              450+ studios
            </span>
          }
        />
        <div className="mb-4 grid grid-cols-2 gap-2 md:grid-cols-4">
          {(
            [
              {
                stat: "94.2%",
                label: "Placement rate",
                Icon: IconBriefcase,
                tone: "text-amber-400 bg-amber-500/10 border-amber-500/30",
              },
              {
                stat: "₹18.5 LPA",
                label: "Highest package",
                Icon: IconAward,
                tone: "text-red-400 bg-red-500/15 border-red-500/30",
              },
              {
                stat: "150+",
                label: "Centres in India",
                Icon: IconPin,
                tone: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
              },
              {
                stat: "MESC",
                label: "Skill India partner",
                Icon: IconMedal,
                tone: "text-amber-400 bg-amber-500/10 border-amber-500/30",
              },
            ] as const
          ).map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 shadow-lg"
            >
              <div>
                <div className="font-display text-lg font-bold text-amber-400 sm:text-xl">
                  {item.stat}
                </div>
                <div className="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-zinc-400">
                  {item.label}
                </div>
              </div>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg border text-xs ${item.tone}`}
              >
                <item.Icon className="h-3.5 w-3.5" />
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/8 bg-zinc-950/60 py-3">
          <div className="marquee-track flex gap-2 px-2">
            {[...studios, ...studios].map((studio, index) => (
              <div
                key={`${studio}-${index}`}
                className="flex h-12 w-36 flex-shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 px-2 py-1 text-center"
              >
                <span className="text-[0.6875rem] font-semibold leading-snug text-zinc-300">
                  {studio}
                </span>
              </div>
            ))}
          </div>
          <div className="marquee-track-rev mt-2 flex gap-2 px-2">
            {[...studios].reverse().concat([...studios].reverse()).map((studio, index) => (
              <div
                key={`rev-${studio}-${index}`}
                className="flex h-12 w-36 flex-shrink-0 items-center justify-center rounded-xl border border-zinc-800/80 bg-zinc-950 px-2 py-1 text-center"
              >
                <span className="text-[0.6875rem] font-semibold leading-snug text-zinc-400">
                  {studio}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pathways() {
  const { openLead } = useLead();
  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-10" id="pathways">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <span className="kicker">Newly launched · Dual pathways</span>
          <h2 className="text-display mt-4 text-[1.75rem] font-bold text-white sm:text-5xl">
            CAREER<span className="text-amber-400">X</span>
            <span className="mx-2 text-zinc-600">&</span>
            CREATOR<span className="text-red-500">X</span>
          </h2>
          <p className="text-body mx-auto mt-3 max-w-2xl text-[0.9375rem] text-zinc-400 sm:text-base">
            Industry co-curated programs that equip you for studios and the
            creator economy — animation, VFX, gaming, and digital content.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <article className="glass-card lift-card relative overflow-hidden rounded-[28px] border-l-4 border-l-amber-500 p-5 shadow-xl sm:p-7">
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-amber-500/10 blur-2xl" />
            <p className="pointer-events-none absolute right-3 top-2 font-display text-6xl font-bold text-amber-400/10 sm:text-7xl">
              X
            </p>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                CAREER<span className="text-amber-400">X</span>
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-amber-300">
                Studio aligned
              </span>
            </div>
            <p className="text-body mb-4 text-sm font-medium text-zinc-300 sm:text-[0.9375rem]">
              A 1st of its kind, industry-led, studio-aligned learning program for
              blockbuster VFX, 3D, and AAA gaming studios.
            </p>
            <ul className="mb-4 space-y-2 text-sm text-zinc-400">
              {[
                "Industry-academia learning",
                "Studio-led delivery",
                "Live case studies",
                "End-to-end production workflow",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <IconCheck className="mt-0.5 h-3.5 w-3.5 text-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
              <span className="text-[11px] font-medium text-zinc-400">AD3D Edge+ / ADVFX+</span>
              <button
                className="flex items-center gap-1 text-xs font-bold text-amber-400"
                onClick={() =>
                  openLead({
                    course: "3D Animation (AD3D Edge Plus)",
                    source: "cta",
                  })
                }
                type="button"
              >
                Explore track <IconArrow className="h-3 w-3" />
              </button>
            </div>
          </article>
          <article className="glass-card lift-card relative overflow-hidden rounded-[28px] border-l-4 border-l-red-500 p-5 shadow-xl sm:p-7">
            <div className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-red-500/15 blur-2xl" />
            <p className="pointer-events-none absolute right-3 top-2 font-display text-6xl font-bold text-red-500/10 sm:text-7xl">
              X
            </p>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                CREATOR<span className="text-red-500">X</span>
              </span>
              <span className="rounded-full border border-red-500/30 bg-red-500/15 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-red-300">
                Create · Collaborate · Grow
              </span>
            </div>
            <p className="text-body mb-4 text-sm font-medium text-zinc-300 sm:text-[0.9375rem]">
              Become a studio-ready artist and an independent creative force —
              for YouTube, freelance, and original IP.
            </p>
            <ul className="mb-4 space-y-2 text-sm text-zinc-400">
              {[
                "Entrepreneurship readiness",
                "Prep for gig economy & freelance work",
                "Project & client management",
                "IP creation & monetisation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <IconBolt className="mt-0.5 h-3.5 w-3.5 text-red-400" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-zinc-800/80 pt-3">
              <span className="text-[11px] font-medium text-zinc-400">APDMC+ / ADIDG+</span>
              <button
                className="flex items-center gap-1 text-xs font-bold text-red-400"
                onClick={() =>
                  openLead({
                    course: "Digital Content Creation (APDMC Plus)",
                    source: "cta",
                  })
                }
                type="button"
              >
                Explore track <IconArrow className="h-3 w-3" />
              </button>
            </div>
            </article>
        </div>
        <div className="mt-6 grid gap-2 sm:grid-cols-4">
          {affiliatedPlus.map((item) => (
            <div
              key={item.code}
              className="rounded-2xl border border-white/8 bg-zinc-900/60 px-4 py-3"
            >
              <span className="block text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-amber-400">
                Powered by CareerX | CreatorX
              </span>
              <span className="font-display text-sm font-bold text-white">{item.code}</span>
              <span className="mt-0.5 block text-xs text-zinc-500">{item.track}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Courses() {
  const { openLead } = useLead();
  return (
    <section
      className="bg-gradient-to-b from-[#09080B] via-[#120a14] to-[#09080B] px-4 py-14 sm:px-6 sm:py-20 lg:px-10"
      id="courses"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="Find the right fit for your future"
          title="MAAC Courses"
          copy="Globally recognized training through MESC and NSDC — skills that set you apart in studios and on creator platforms."
          action={
            <button
              className="rounded-full border border-amber-400/40 px-4 py-2 text-xs font-bold text-amber-300"
              onClick={() => openLead({ source: "cta" })}
              type="button"
            >
              Pick your course
            </button>
          }
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, index) => (
            <article
              key={course.id}
              className="lift-card group overflow-hidden rounded-[28px] border border-white/10 bg-brand-card shadow-xl"
            >
              <div className="relative h-52 overflow-hidden sm:h-56">
                <Image
                  alt={`${course.title} course at MAAC`}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  src={course.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121018] via-black/20 to-transparent" />
                <span className="absolute left-3 top-3 font-display text-3xl font-extrabold text-white/25">
                  0{index + 1}
                </span>
                <div
                  className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${badgeClass[course.badgeTone]}`}
                >
                  {course.badge}
                </div>
                {course.powered ? (
                  <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-amber-300 backdrop-blur">
                    Powered by CareerX | CreatorX
                  </span>
                ) : null}
              </div>
              <div className="p-5">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="text-display min-w-0 text-lg font-bold text-white sm:text-xl">
                    {course.title}
                  </h3>
                  <span className="flex flex-shrink-0 items-center gap-1 pt-1 text-xs font-semibold text-amber-400">
                    <IconClock className="h-3 w-3" />
                    {course.duration}
                  </span>
                </div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  {course.code}
                </p>
                <p className="mb-3 line-clamp-2 text-sm text-zinc-400">{course.summary}</p>
                <p className="mb-4 text-[11px] text-zinc-500">
                  Become a {course.roles.join(" · ")}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="flex-1 rounded-full bg-zinc-800 py-2.5 text-center text-xs font-semibold text-zinc-200 transition hover:bg-zinc-700"
                    onClick={() =>
                      openLead({ course: `${course.title} (${course.code})`, source: "cta" })
                    }
                    type="button"
                  >
                    View details
                  </button>
                  <button
                    className="rounded-full bg-brand-crimson px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-crimson-light"
                    onClick={() =>
                      openLead({ course: `${course.title} (${course.code})`, source: "cta" })
                    }
                    type="button"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Events() {
  return (
    <section className="relative bg-black px-4 py-14 sm:px-6 sm:py-20 lg:px-10" id="events">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="Celebrating creativity and innovation"
          title={
            <>
              Create. Compete.{" "}
              <span className="text-red-400">Level up.</span>
            </>
          }
          copy="Every MAAC event is a chance to challenge yourself and build industry-ready confidence."
        />
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-2">
          <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
            {events.map((event) => (
              <article
                key={event.title}
                className="lift-card w-[72vw] max-w-72 flex-shrink-0 overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-900 shadow-lg sm:w-72"
              >
                <div className="relative h-32 overflow-hidden bg-zinc-950">
                  <Image alt={event.title} className="object-cover" src={event.image} fill sizes="256px" />
                  <div className="absolute bottom-1 right-2 rounded bg-black/80 px-2 py-0.5 text-[9px] font-bold text-amber-400">
                    {event.tag}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-display text-sm font-bold text-white">{event.title}</h3>
                  <p className="mt-0.5 line-clamp-2 text-[11px] text-zinc-400">{event.blurb}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Showreel() {
  return (
    <section
      className="border-t border-brand-border bg-gradient-to-b from-black via-zinc-950 to-[#09080B] px-4 py-14 sm:px-6 sm:py-20 lg:px-10"
      id="showreel"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="MAAC students' work"
          title={
            <>
              Creativity speaks{" "}
              <span className="gold-gradient-text">louder than words.</span>
            </>
          }
          copy="See how MAAC students raise the bar with projects that blend skill, vision, and real-world training."
          action={
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-300">
              Award winners
            </span>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              title: "‘The Awakening’ — 3D Sci-Fi Short",
              meta: "Direction, rigging & lighting by Team MAAC Mumbai",
              time: "03:42",
              badge: "24FPS Gold Trophy Winner",
              image: "/images/showreel-1.jpg",
            },
            {
              title: "Hyper-Real CG Environment & FX",
              meta: "ADVFX Plus student graduation reel",
              time: "02:18",
              badge: "Best VFX Breakdown",
              image: "/images/showreel-2.jpg",
            },
          ].map((reel) => (
            <article
              key={reel.title}
              className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card shadow-xl"
            >
              <div className="relative h-44 overflow-hidden lg:h-56">
                <Image
                  alt={reel.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  src={reel.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-950/90 px-2.5 py-1 text-[10px] font-bold uppercase text-red-200">
                  <IconAward className="h-3 w-3 text-amber-400" />
                  {reel.badge}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-amber-400/90 shadow-gold-glow transition-transform group-hover:scale-110">
                    <IconPlay className="ml-0.5 h-4 w-4 text-black" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3.5">
                <div>
                  <h3 className="font-display text-sm font-bold text-white">{reel.title}</h3>
                  <span className="text-[11px] text-zinc-400">{reel.meta}</span>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400">
                  <IconClock className="h-3 w-3" />
                  {reel.time}
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-[28px] border border-white/8 filmstrip p-3">
          <h3 className="mb-3 px-1 font-display text-lg font-bold text-white">Student work</h3>
          <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
            {studentWork.map((work) => (
              <figure key={work.name} className="w-40 flex-shrink-0">
                <div className="relative h-32 overflow-hidden rounded-xl border border-zinc-800">
                  <Image alt={work.name} className="object-cover" src={work.image} fill sizes="160px" />
                </div>
                <figcaption className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-zinc-300">
                  {work.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Alumni() {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="Meet the game-changers"
          title="From MAAC to the big leagues"
          copy="Alumni making waves in gaming studios, production houses, and VFX giants — and you could be next."
        />
        <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-3 lg:grid-cols-3">
          {alumni.map((person) => (
            <article
              key={person.name}
              className="w-[17rem] flex-shrink-0 overflow-hidden rounded-[24px] border border-white/8 bg-zinc-900/80 p-4 md:w-auto"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-amber-500/40">
                    <Image alt={person.name} className="object-cover" src={person.image} fill sizes="48px" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {person.name}
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {person.field}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between gap-2">
                <span className="font-display text-2xl font-bold text-amber-400 sm:text-3xl">
                  {person.salary}
                </span>
                <span className="max-w-[45%] text-right text-xs font-semibold leading-snug text-zinc-400">
                  {person.company}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyMaac() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10" id="why">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
        <div>
          <span className="kicker">Your trusted training partner</span>
          <h2 className="text-display mt-3 text-[1.75rem] font-bold text-white sm:text-4xl">
            Why learn at <span className="gold-gradient-text">MAAC?</span>
          </h2>
          <p className="text-body mt-2.5 text-[0.9375rem] text-zinc-400 sm:text-base">
            Empower your future with skills that matter — proudly partnered with
            MESC under the Skill India Mission.
          </p>
          <div className="relative mt-4 mb-4 h-48 overflow-hidden rounded-2xl border border-zinc-800 lg:h-72">
            <Image alt="Masterclass workshop at MAAC" className="object-cover" src="/images/workshop.jpg" fill sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <p className="absolute bottom-3 left-3 right-3 text-xs font-medium text-white">
              “From exclusive workshops to high-impact masterclasses, MAAC sharpens
              your talent for the global stage.”
            </p>
          </div>
        </div>
        <div className="space-y-2.5">
          {whyMaac.map((item, index) => {
            const active = open === index;
            return (
              <button
                key={item.title}
                className={`w-full rounded-xl border p-3.5 text-left transition ${
                  active
                    ? "border-red-500/30 bg-gradient-to-r from-red-950/70 to-zinc-900"
                    : "border-zinc-800 bg-zinc-900"
                }`}
                onClick={() => setOpen(index)}
                type="button"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-xs font-bold text-amber-400">
                      0{index + 1}
                    </span>
                    <span className="min-w-0 pr-2 text-sm font-semibold leading-snug text-white">
                      {item.title}
                    </span>
                  </div>
                  <IconChevron
                    className={`h-3.5 w-3.5 flex-shrink-0 text-zinc-500 transition ${active ? "rotate-90" : ""}`}
                  />
                </div>
                {active ? (
                  <p className="text-body mt-2 pl-11 text-sm text-zinc-400">
                    {item.detail}
                  </p>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Schemes() {
  const { openLead } = useLead();
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10" id="schemes">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          kicker="Your future, our priority"
          title="Laptop, camera & easy EMI"
          copy="Flexible investment plans, easy EMIs, and merit-based scholarships. Every step here is an investment in a brighter, more fulfilling life."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Laptop Scheme",
              image: "/images/laptop.jpg",
              copy: "Assisted device plans so every student trains on a production-capable workstation.",
            },
            {
              title: "Camera Scheme",
              image: "/images/camera.jpg",
              copy: "Filmmaking and photography tracks can tap camera support — see official guidelines.",
            },
            {
              title: "EMI + 35% Scholarship",
              image: "/images/learning.jpg",
              copy: "Bharat Creator Scholarship window is open till 31 October 2026. Ask a counselor.",
            },
          ].map((card) => (
            <article key={card.title} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
              <div className="relative h-36">
                <Image alt={card.title} className="object-cover" src={card.image} fill sizes="400px" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-bold text-white">{card.title}</h3>
                <p className="mt-1 mb-3 text-xs text-zinc-400">{card.copy}</p>
                <button
                  className="text-xs font-bold text-amber-400"
                  onClick={() => openLead({ source: "cta" })}
                  type="button"
                >
                  Get scheme details →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function QuizBanner() {
  const { openQuiz } = useLead();
  return (
    <section className="border-y border-amber-500/30 bg-gradient-to-r from-red-950/80 via-zinc-900 to-amber-950/80 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/40 bg-zinc-950/90 p-5 shadow-xl">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-amber-500/15 blur-2xl" />
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2 w-2 animate-ping rounded-full bg-amber-400" />
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-amber-400">
              Interactive career matcher
            </span>
          </div>
          <h3 className="text-display mb-1.5 text-xl font-bold text-white sm:text-2xl">
            Not sure which creative track fits you?
          </h3>
          <p className="text-body mb-4 text-sm text-zinc-400">
            Answer 3 quick questions and get a course recommendation plus an
            indicative scholarship score (up to 35%).
          </p>
          <div className="mb-4 grid grid-cols-3 gap-2 text-center">
            {[
              ["60 secs", "Quick test"],
              ["Up to 35%", "Fee waiver"],
              ["1-on-1", "Free mentoring"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-lg border border-zinc-800 bg-zinc-900 p-2">
                <span className="block text-xs font-bold text-amber-300">{a}</span>
                <span className="text-[9px] text-zinc-500">{b}</span>
              </div>
            ))}
          </div>
          <button
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-3 text-sm font-bold uppercase tracking-[0.04em] text-black shadow-gold-glow"
            onClick={openQuiz}
            type="button"
          >
            Check eligibility in 60s
            <IconArrow className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export function Centres() {
  const states = Object.keys(centresByState);
  const [state, setState] = useState(states[0]);
  const centres = useMemo(() => centresByState[state] ?? [], [state]);
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10" id="centres">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-display text-[1.65rem] font-bold text-white sm:text-3xl">
          Locate a centre
        </h2>
        <p className="text-body mt-1.5 mb-4 text-sm text-zinc-400">
          Pick a state to preview nearby MAAC centres. Final availability is
          confirmed on the counseling call.
        </p>
        <div className="hide-scrollbar mb-4 flex gap-2 overflow-x-auto">
          {states.map((item) => (
            <button
              key={item}
              className={`flex-shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                item === state
                  ? "border-amber-400 bg-amber-400 text-black"
                  : "border-zinc-700 bg-zinc-900 text-zinc-300"
              }`}
              onClick={() => setState(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {centres.map((centre) => (
            <div
              key={centre}
              className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm text-white"
            >
              <IconPin className="h-4 w-4 text-amber-400" />
              {centre}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-10" id="faq">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-display mb-4 text-[1.65rem] font-bold text-white sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="space-y-2">
          {faqs.map((item, index) => (
            <div key={item.q} className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
              <button
                className="flex w-full items-start justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold leading-snug text-white"
                onClick={() => setOpen(open === index ? -1 : index)}
                type="button"
              >
                <span className="min-w-0">{item.q}</span>
                <IconChevron
                  className={`mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400 transition ${open === index ? "rotate-90" : ""}`}
                />
              </button>
              {open === index ? (
                <p className="text-body px-4 pb-3.5 text-sm text-zinc-400">{item.a}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Enquiry() {
  return (
    <section
      className="bg-gradient-to-b from-[#110e17] to-[#09080B] px-4 py-12 sm:px-6 sm:py-16 lg:px-10"
      id="lead-form"
    >
      <div className="relative mx-auto max-w-md rounded-3xl border border-amber-500/30 bg-zinc-950/90 p-5 shadow-2xl">
        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative mb-5 h-36 overflow-hidden rounded-2xl border border-zinc-800">
          <Image alt="MAAC students" className="object-cover object-top" src="/images/workshop.jpg" fill sizes="400px" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
          <div className="absolute bottom-2 left-3">
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.06em] text-amber-400">
              Start your MAAC journey
            </span>
            <h3 className="text-display text-lg font-bold text-white sm:text-xl">
              Get in touch to get ahead
            </h3>
          </div>
        </div>
        <p className="text-body mb-4 text-sm text-zinc-400">
          You&apos;re one step away from turning passion into a profession —
          reach out now.
        </p>
        <LeadForm idPrefix="page" />
      </div>
    </section>
  );
}

export function Feedback() {
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);
  return (
    <section className="border-t border-brand-crimson bg-brand-crimson-dark px-4 py-5">
      <div className="mx-auto max-w-md text-center">
        <h4 className="mb-2 text-sm font-bold text-white">
          Did you find the information you were looking for?
        </h4>
        {choice ? (
          <p className="text-xs text-amber-200">Thanks for the feedback.</p>
        ) : (
          <div className="flex justify-center gap-3">
            {(["yes", "no"] as const).map((item) => (
              <button
                key={item}
                className="rounded-full border border-white/40 px-5 py-1.5 text-xs font-semibold capitalize transition hover:bg-white hover:text-black"
                onClick={() => setChoice(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-red-900 bg-[#3d020d] px-4 pb-32 pt-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <div className="mb-3 inline-block isolate rounded-xl bg-black px-3 py-2">
            <BrandMark size="lg" />
          </div>
          <p className="text-xs leading-relaxed text-rose-100/80">
            Join MAAC and unlock your true potential — animation, VFX, gaming, and
            digital media careers across India.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Programs
            </span>
            <ul className="space-y-1.5 text-rose-100/80">
              <li><a href="#courses">3D Animation</a></li>
              <li><a href="#courses">Visual Effects</a></li>
              <li><a href="#courses">Gaming & Interactive</a></li>
              <li><a href="#placements">Placement records</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Student desk
            </span>
            <ul className="space-y-1.5 text-rose-100/80">
              <li><a href="#lead-form">Student enquiry</a></li>
              <li><a href="#schemes">Laptop & camera schemes</a></li>
              <li>
                <a href={OFFICIAL_SITE} target="_blank" rel="noreferrer">
                  Official MAAC site
                </a>
              </li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-red-900/60 pt-4 md:border-0 md:pt-0">
          <div>
            <span className="block text-[10px] uppercase tracking-wider text-rose-200">
              Call us
            </span>
            <a className="text-sm font-bold text-amber-300" href={`tel:${MOBILE}`}>
              {MOBILE_DISPLAY}
            </a>
            <a className="mt-0.5 block text-xs text-rose-100/80" href={`tel:${PHONE}`}>
              Toll-free {PHONE_DISPLAY}
            </a>
            <div className="text-[10px] text-rose-200">{EMAIL}</div>
          </div>
          <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border-2 border-dashed border-rose-300 p-1 text-center">
            <span className="text-[7px] font-black uppercase text-amber-300">Official</span>
            <IconMedal className="my-0.5 h-3.5 w-3.5 text-rose-200" />
            <span className="text-[6px] uppercase tracking-tighter text-zinc-200">
              Aptech Ltd
            </span>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-6xl text-center text-[10px] text-rose-200/70">
        © 2026 Aptech Ltd. All rights reserved. Campaign site inspired by{" "}
        <a className="underline" href={OFFICIAL_SITE} target="_blank" rel="noreferrer">
          maacindia.com
        </a>
        . Scholarship terms apply.
      </p>
    </footer>
  );
}
