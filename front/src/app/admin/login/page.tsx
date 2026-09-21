"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Login failed.");
      }
      router.replace(from.startsWith("/") ? from : "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#f7f4ee] px-4 py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-stone-900">Viorix Admin</h1>
        <p className="mt-1 text-sm text-stone-500">Sign in to continue.</p>

        <label className="mt-6 block text-xs font-medium uppercase tracking-wider text-stone-500">
          Username
        </label>
        <input
          className="mt-1.5 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#2670a8] focus:ring-2 focus:ring-[#2670a8]/25"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          autoFocus
        />

        <label className="mt-4 block text-xs font-medium uppercase tracking-wider text-stone-500">
          Password
        </label>
        <input
          type="password"
          className="mt-1.5 w-full rounded-md border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#2670a8] focus:ring-2 focus:ring-[#2670a8]/25"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {error && (
          <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-[#134a73] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1a5c8f] disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
