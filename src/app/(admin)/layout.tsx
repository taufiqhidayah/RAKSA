import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./admin.css";
import { getAdminContext } from "@/shared/di/get-admin-context";
import { superadminDisplayName } from "@/shared/config/superadmin-display";
import { AdminShell } from "@/presentation/components/admin/admin-shell";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-admin",
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — raksa",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let email: string;

  try {
    const { user } = await getAdminContext();
    email = user.email;
  } catch {
    // Defense-in-depth: middleware already blocks, but never render on failure.
    redirect("/dashboard");
  }

  return (
    <div className={inter.variable}>
      <AdminShell userEmail={email} userName={superadminDisplayName(email)}>
        {children}
      </AdminShell>
    </div>
  );
}
