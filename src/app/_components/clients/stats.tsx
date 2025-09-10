import { Users } from "lucide-react";
import { api } from "~/trpc/server";
import { ValueCard } from "../common/value_card";

export async function ClientsStats() {

  const clientsData = await api.gym.getClientsStats();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <ValueCard title="Total Clientes" value={clientsData?.total ?? 0} description="Registrados en el sistema" icon={<Users className="h-4 w-4 text-muted-foreground" />} />

      <ValueCard title="Clientes Activos" value={clientsData?.active ?? 0} description="Actualmente activos" icon={<Users className="h-4 w-4 text-muted-foreground" />} />

      <ValueCard title="Clientes Vencidos" value={clientsData?.inactive ?? 0} description="Requieren renovación" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
    </div>
  );
}