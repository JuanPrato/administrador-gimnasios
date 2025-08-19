import { getGeneralGymStats } from "~/server/api/routers/gym";
import { ValueCard } from "../common/value_card";
import type { Profile } from "~/server/auth/server";
import { formatCurrency } from "~/lib/utils";

export async function Stats({ profile }: { profile: Profile }) {

  const stats = await getGeneralGymStats(profile.gym);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <ValueCard title='Clientes Activos' value={stats.activeMembers} description='Total de miembros activos' />

      <ValueCard title='Nuevos Clientes' value={stats.newClientsThisMonth} description='Este mes' />

      <ValueCard title='Ingresos del Mes' value={formatCurrency(stats.monthlyRevenue)} description='Este mes' />

      <ValueCard title='Accesos del Mes' value={stats.monthlyAccess} description='Total de ingresos del gimnasio' />
    </div>
  );
}