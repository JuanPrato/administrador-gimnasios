import { ClientsStats } from "../_components/clients/stats";
import { ClientTable } from "../_components/clients/clients_table";
import { Filters } from "../_components/clients/filters";
import { api } from "~/trpc/server";

export type ClientsFilterType = { search: string, status: "todos" | "activo" | "inactivo", plan: string };

export default async function ClientsPage({ searchParams }: { searchParams: Promise<ClientsFilterType> }) {

  const resolvedSearchParams = await searchParams;

  const clients = await api.user.getClientUsers({ plan: resolvedSearchParams.plan, search: resolvedSearchParams.search, status: resolvedSearchParams.status });

  return (
    <main className="flex flex-col gap-6">
      <ClientsStats />
      <Filters params={resolvedSearchParams} resultsQ={clients.length} />
      <ClientTable clients={clients} />
    </main>
  );

}