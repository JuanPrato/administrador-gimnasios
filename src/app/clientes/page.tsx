import { ClientsStats } from "../_components/clients/stats";
import { ClientTable } from "../_components/clients/clients_table";
import { Filters } from "../_components/clients/filters";

export type ClientsFilterType = { search: string, status: "todos" | "activo" | "inactivo", plan: string };

export default async function ClientsPage({ searchParams }: { searchParams: Promise<ClientsFilterType> }) {

  const resolvedSearchParams = await searchParams;

  return (
    <main className="flex flex-col gap-6">
      <ClientsStats />
      <Filters params={resolvedSearchParams} />
      <ClientTable params={resolvedSearchParams} />
    </main>
  );

}