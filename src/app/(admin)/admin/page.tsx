import { CreditCard, CheckCircle2, Clock3, Ban, Plus } from "lucide-react";
import { getAdminContext } from "@/shared/di/get-admin-context";
import { superadminDisplayName } from "@/shared/config/superadmin-display";
import { StatCard } from "@/presentation/components/admin/stat-card";
import { LinkButton } from "@/presentation/components/admin/ui/button";
import { RecentRegistrations } from "@/presentation/components/admin/recent-registrations";

export default async function AdminDashboardPage() {
  const { admin, user } = await getAdminContext();
  const [stats, recent] = await Promise.all([
    admin.useCases.getAdminStats.execute(),
    admin.useCases.listAdminWristbands.execute({ page: 1, pageSize: 6 }),
  ]);

  const firstName = superadminDisplayName(user.email).split(" ")[0];

  return (
    <div className="space-y-8">
      {/* Hero banner */}
      <section className="admin-animate-in relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#f4f1ff] via-[#efeafe] to-[#f7f3ff] px-6 py-8 ring-1 ring-brand-100/70 sm:px-10 sm:py-9 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:ring-white/5">
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-brand-600 dark:text-brand-300">
              Welcome back, {firstName}! 👋
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Overview of NFC tags registered in the raksa system.
            </p>
          </div>
          <LinkButton href="/admin/cards?new=1" pill className="shrink-0">
            <Plus className="h-4 w-4 text-white" />
            <span className="text-white">Register tag</span>
          </LinkButton>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total registered" value={stats.total} icon={CreditCard} tone="brand" hint="All tags in the system" index={0} />
        <StatCard
          label="Active today"
          value={stats.activatedToday}
          icon={CheckCircle2}
          tone="emerald"
          hint="Tags activated today"
          trend={{ label: "today", direction: "up" }}
          index={1}
        />
        <StatCard label="Pending activation" value={stats.pending} icon={Clock3} tone="amber" hint="Unclaimed / claimed" index={2} />
        <StatCard label="Disabled / Revoked" value={stats.inactive} icon={Ban} tone="slate" hint="No longer active" index={3} />
      </div>

      {/* Recent */}
      <RecentRegistrations items={recent.items} />
    </div>
  );
}
