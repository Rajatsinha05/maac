import { NextResponse } from "next/server";
import { createAdminSession, verifyAdminCredentials } from "@/app/lib/auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      id?: string;
      password?: string;
    };
    const id = (body.id || "").trim();
    const password = body.password || "";

    if (!id || !password) {
      return NextResponse.json(
        { error: "Admin ID and password are required." },
        { status: 400 },
      );
    }

    if (!verifyAdminCredentials(id, password)) {
      return NextResponse.json(
        { error: "Invalid admin ID or password." },
        { status: 401 },
      );
    }

    await createAdminSession(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin login failed:", error);
    return NextResponse.json(
      { error: "Login failed. Check server env configuration." },
      { status: 500 },
    );
  }
}
