"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-full flex-1 items-center justify-center bg-[#0a090e] px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-zinc-950/90 p-6 shadow-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-amber-400">
          Restricted access
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-white">
          Admin login
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Sign in with your admin ID and password to view leads.
        </p>
        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-zinc-300"
              htmlFor="admin-id"
            >
              Admin ID
            </label>
            <input
              id="admin-id"
              autoComplete="username"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-3 text-sm text-white outline-none focus:border-amber-400"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.04em] text-zinc-300"
              htmlFor="admin-password"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3.5 py-3 text-sm text-white outline-none focus:border-amber-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error ? (
            <p className="text-xs font-semibold text-red-400">{error}</p>
          ) : null}
          <button
            className="mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 py-3 text-sm font-bold uppercase tracking-[0.04em] text-black disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
