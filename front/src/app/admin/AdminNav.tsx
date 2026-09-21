"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/prospects", label: "Prospects" },
  { href: "/admin/sequences", label: "Sequences" },
  { href: "/admin/invoice", label: "Invoice" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-1 px-4 sm:px-6">
        <span className="mr-4 py-3 text-sm font-semibold text-[#134a73]">Viorix Admin</span>
        <nav className="flex flex-1 flex-wrap gap-1">
          {LINKS.map((l) => {
            const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#134a73] text-white"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="rounded-md px-3 py-2 text-sm font-medium text-stone-500 hover:bg-stone-100 hover:text-red-600"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
