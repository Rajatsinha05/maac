import { NextResponse } from "next/server";
import { createLead } from "@/app/lib/leads";
import { programOptions } from "@/app/lib/data";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      phone?: string;
      program?: string;
      source?: string;
    };

    const name = (body.name || "").trim();
    const phone = (body.phone || "").replace(/\D/g, "");
    const program = (body.program || "").trim();
    const source = (body.source || "website").trim();

    if (name.length < 3) {
      return NextResponse.json(
        { error: "Please enter your full name." },
        { status: 400 },
      );
    }
    if (phone.length !== 10) {
      return NextResponse.json(
        { error: "Enter a valid 10-digit mobile number." },
        { status: 400 },
      );
    }
    if (!program || !programOptions.includes(program)) {
      return NextResponse.json(
        { error: "Please select a valid program." },
        { status: 400 },
      );
    }

    const lead = await createLead({ name, phone, program, source });
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Lead create failed:", error);
    return NextResponse.json(
      { error: "Could not save your enquiry. Please try again." },
      { status: 500 },
    );
  }
}
