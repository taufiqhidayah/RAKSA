import { ShieldCheck, KeyRound, Globe, CheckCircle2, AlertTriangle } from "lucide-react";
import { getAdminContext } from "@/shared/di/get-admin-context";
import { env } from "@/shared/config/env";
import { PageHeader } from "@/presentation/components/admin/ui/page-header";

function ConfigRow({
  label,
  ok,
  value,
  icon: Icon,
}: {
  label: string;
  ok: boolean;
  value: string;
  icon: typeof Globe;
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 dark:bg-slate-700/50 dark:text-slate-300">
          <Icon className="h-4.5 w-4.5" />
        </span>
        <div>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{label}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{value}</p>
        </div>
      </div>
      {ok ? (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
          <CheckCircle2 className="h-4 w-4" /> OK
        </span>
      ) : (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
          <AlertTriangle className="h-4 w-4" /> Not set
        </span>
      )}
    </div>
  );
}

export default async function AdminSettingsPage() {
  const { user } = await getAdminContext();

  const serviceRoleConfigured = Boolean(env.SUPABASE_SERVICE_ROLE_KEY);
  const superadminConfigured = Boolean(env.SUPERADMIN_USER_ID);

  return (
    <div>
      <PageHeader
        title="Settings"
        description="Superadmin account information and system configuration."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Settings" }]}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[var(--shadow-soft)] dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">Superadmin account</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
            </div>
          </div>
          <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-700/40 dark:text-slate-400">
            Authorization is determined by <code className="font-mono">SUPERADMIN_USER_ID</code> in the server environment, not from the database. Authentication and passwords are managed by Supabase Auth.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[var(--shadow-soft)] dark:border-slate-700 dark:bg-slate-800">
          <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-700">
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">Configuration</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            <ConfigRow
              label="Superadmin ID"
              value="SUPERADMIN_USER_ID"
              ok={superadminConfigured}
              icon={ShieldCheck}
            />
            <ConfigRow
              label="Service Role Key"
              value="Required for admin operations (bypass RLS)"
              ok={serviceRoleConfigured}
              icon={KeyRound}
            />
            <ConfigRow
              label="App URL"
              value={env.NEXT_PUBLIC_APP_URL}
              ok={Boolean(env.NEXT_PUBLIC_APP_URL)}
              icon={Globe}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
