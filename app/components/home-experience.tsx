"use client";

import { LeadProvider } from "@/app/components/lead-context";
import {
  ChatWidget,
  LeadPopup,
  StickyBottomBar,
} from "@/app/components/chrome";
import { CareerQuiz } from "@/app/components/quiz";
import {
  Alumni,
  Centres,
  Courses,
  Enquiry,
  Events,
  Faq,
  Feedback,
  Footer,
  Hero,
  Pathways,
  QuizBanner,
  Recruiters,
  Schemes,
  Showreel,
  Statement,
  Usps,
  WhyMaac,
} from "@/app/components/sections";

export function HomeExperience() {
  return (
    <LeadProvider>
      <main>
        <Hero />
        <Statement />
        <Usps />
        <Pathways />
        <Courses />
        <Recruiters />
        <Alumni />
        <Showreel />
        <Events />
        <WhyMaac />
        <Schemes />
        <QuizBanner />
        <Centres />
        <Faq />
        <Enquiry />
        <Feedback />
      </main>
      <Footer />
      <ChatWidget />
      <StickyBottomBar />
      <LeadPopup />
      <CareerQuiz />
    </LeadProvider>
  );
}
