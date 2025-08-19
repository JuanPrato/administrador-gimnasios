import { ValueCard } from "../common/value_card";
import { formatCurrency } from "~/lib/utils";
import { api } from "~/trpc/server";

export async function Stats() {

  const stats = await api.gym.getGeneralGymStats();

  if (!stats) return;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <ValueCard title='Clientes Activos' value={stats.activeMembers} description='Total de miembros activos' />

      <ValueCard title='Nuevos Clientes' value={stats.newClientsThisMonth} description='Este mes' />

      <ValueCard title='Ingresos del Mes' value={formatCurrency(stats.monthlyRevenue)} description='Este mes' />

      <ValueCard title='Accesos del Mes' value={stats.monthlyAccess} description='Total de ingresos del gimnasio' />
    </div>
  );
}