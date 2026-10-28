import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — MAAC Leads",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export const instant = false;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
