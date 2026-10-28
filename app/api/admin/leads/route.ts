import { NextResponse } from "next/server";
import { requireAdminSession } from "@/app/lib/auth";
import {
  listLeads,
  updateLeadStatus,
  type LeadStatus,
} from "@/app/lib/leads";

const allowed: LeadStatus[] = ["new", "contacted", "closed"];

export async function GET() {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await listLeads();
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("List leads failed:", error);
    return NextResponse.json(
      { error: "Could not load leads." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { id?: string; status?: string };
    const id = body.id || "";
    const status = body.status as LeadStatus;
    if (!id || !allowed.includes(status)) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }
    const ok = await updateLeadStatus(id, status);
    if (!ok) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Update lead failed:", error);
    return NextResponse.json(
      { error: "Could not update lead." },
      { status: 500 },
    );
  }
}
