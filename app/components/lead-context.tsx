"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LeadSource = "popup" | "form" | "quiz" | "cta" | "chat";

type LeadContextValue = {
  leadOpen: boolean;
  quizOpen: boolean;
  chatOpen: boolean;
  defaultCourse: string;
  source: LeadSource;
  submitted: boolean;
  openLead: (opts?: { course?: string; source?: LeadSource }) => void;
  closeLead: () => void;
  openQuiz: () => void;
  closeQuiz: () => void;
  toggleChat: () => void;
  closeChat: () => void;
  markSubmitted: () => void;
};

const LeadContext = createContext<LeadContextValue | null>(null);

const SHOWN_KEY = "maac-lead-shown";
const DONE_KEY = "maac-lead-submitted";

export function LeadProvider({ children }: { children: ReactNode }) {
  const [leadOpen, setLeadOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [defaultCourse, setDefaultCourse] = useState(
    "3D Animation (AD3D Edge Plus)",
  );
  const [source, setSource] = useState<LeadSource>("form");
  const [submitted, setSubmitted] = useState(false);

  const closeQuiz = useCallback(() => setQuizOpen(false), []);
  const closeChat = useCallback(() => setChatOpen(false), []);
  const closeLead = useCallback(() => setLeadOpen(false), []);

  const openLead = useCallback(
    (opts?: { course?: string; source?: LeadSource }) => {
      if (opts?.course) setDefaultCourse(opts.course);
      if (opts?.source) setSource(opts.source);
      setQuizOpen(false);
      setChatOpen(false);
      setLeadOpen(true);
      try {
        sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {
        /* ignore */
      }
    },
    [],
  );

  const openQuiz = useCallback(() => {
    setLeadOpen(false);
    setChatOpen(false);
    setQuizOpen(true);
  }, []);

  const toggleChat = useCallback(() => {
    setChatOpen((open) => !open);
  }, []);

  const markSubmitted = useCallback(() => {
    setSubmitted(true);
    try {
      sessionStorage.setItem(DONE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DONE_KEY) === "1") {
        setSubmitted(true);
        return;
      }
    } catch {
      /* ignore */
    }

    let shown = false;
    const markShown = () => {
      shown = true;
      try {
        sessionStorage.setItem(SHOWN_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    try {
      if (sessionStorage.getItem(SHOWN_KEY) === "1") return;
    } catch {
      /* ignore */
    }

    const timer = window.setTimeout(() => {
      if (shown) return;
      markShown();
      setSource("popup");
      setLeadOpen(true);
    }, 7000);

    const onScroll = () => {
      if (shown) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= 0.28) {
        markShown();
        setSource("popup");
        setLeadOpen(true);
        window.clearTimeout(timer);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const locked = leadOpen || quizOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [leadOpen, quizOpen]);

  const value = useMemo(
    () => ({
      leadOpen,
      quizOpen,
      chatOpen,
      defaultCourse,
      source,
      submitted,
      openLead,
      closeLead,
      openQuiz,
      closeQuiz,
      toggleChat,
      closeChat,
      markSubmitted,
    }),
    [
      leadOpen,
      quizOpen,
      chatOpen,
      defaultCourse,
      source,
      submitted,
      openLead,
      closeLead,
      openQuiz,
      closeQuiz,
      toggleChat,
      closeChat,
      markSubmitted,
    ],
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
}

export function useLead() {
  const ctx = useContext(LeadContext);
  if (!ctx) throw new Error("useLead must be used within LeadProvider");
  return ctx;
}
