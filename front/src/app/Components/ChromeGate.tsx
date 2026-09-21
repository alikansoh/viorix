"use client";

import { usePathname } from "next/navigation";

/**
 * Renders the marketing site chrome (navbar / footer / floating buttons) on all
 * routes except the admin area, which has its own layout.
 */
export default function ChromeGate({
  navbar,
  footer,
  children,
}: {
  navbar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const bare = pathname === "/admin" || pathname?.startsWith("/admin/");

  if (bare) return <>{children}</>;

  return (
    <>
      {navbar}
      <main className="">{children}</main>
      {footer}
    </>
  );
}
