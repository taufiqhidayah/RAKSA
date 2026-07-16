import { getAdminContext } from "@/shared/di/get-admin-context";
import { PageHeader } from "@/presentation/components/admin/ui/page-header";
import { CardsTable } from "@/presentation/components/admin/cards-table";

const PAGE_SIZE = 10;

interface CardsPageProps {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}

export default async function AdminCardsPage({ searchParams }: CardsPageProps) {
  const params = await searchParams;
  const page = Math.max(Number.parseInt(params.page ?? "1", 10) || 1, 1);
  const status = params.status ?? "";
  const search = params.search ?? "";

  const { admin } = await getAdminContext();
  const { items, total } = await admin.useCases.listAdminWristbands.execute({
    status: status || undefined,
    search: search || undefined,
    page,
    pageSize: PAGE_SIZE,
  });

  return (
    <div>
      <PageHeader
        title="Registered Tags"
        description="Semua tag NFC yang terdaftar. Cari, filter, lihat detail, cabut, atau hapus."
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Registered Cards" }]}
      />
      <CardsTable
        items={items}
        total={total}
        page={page}
        pageSize={PAGE_SIZE}
        status={status}
        search={search}
      />
    </div>
  );
}
