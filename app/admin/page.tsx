import { Suspense } from "react";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/app/lib/auth";
import { getLeadStats, listLeads } from "@/app/lib/leads";
import { LeadsDashboard } from "@/app/admin/components/leads-dashboard";

export const instant = false;

async function DashboardContent() {
  const session = await requireAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [leads, stats] = await Promise.all([listLeads(), getLeadStats()]);

  return (
    <LeadsDashboard
      username={session.username}
      initialLeads={leads}
      stats={stats}
    />
  );
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-full flex-1 items-center justify-center bg-[#07060a] text-sm text-zinc-400">
          Loading dashboard…
        </main>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
