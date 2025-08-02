import { SubTitle, Title } from "@/components/common/typography"
import { UserNav } from "@/components/common/user_avatar"
import { ValueCard } from "@/components/common/value_card"
import { AccessGraph } from "@/components/dashboard/access_graph"
import { LastPayments } from "@/components/dashboard/last_payments"
import { PlansGraph } from "@/components/dashboard/plans_graph"
import { NewClientModal } from "@/components/dashboard/user_modal"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Plus, UserPlus } from "lucide-react"

// Datos de ejemplo para el dashboard
const statsData = {
  totalClients: 342,
  newClientsThisMonth: 28,
  monthlyRevenue: 45680,
  monthlyAccess: 1247,
}

export function Dashboard() {
  return (
    <div className='min-h-screen bg-gray-50 space-y-6 p-4 md:p-6 lg:p-8'>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Title>Dashboard Administrativo</Title>
            <SubTitle>Resumen del mes actual - Enero 2024</SubTitle>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <NewClientModal
              trigger={
                <Button className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Agregar nuevo cliente
                </Button>
              }
            />
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              Crear nuevo plan
            </Button>
            <UserNav />
          </div>
        </div>

        {/* Tarjetas de estadísticas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ValueCard title='Clientes Activos' value={statsData.totalClients} description='Total de miembros activos' />

          <ValueCard title='Nuevos Clientes' value={statsData.newClientsThisMonth} description='Este mes' />

          <ValueCard title='Ingresos del Mes' value={formatCurrency(statsData.monthlyRevenue)} description='Enero 2024' />

          <ValueCard title='Accesos del Mes' value={statsData.monthlyAccess} description='Total de ingresos del gimnasio' />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <AccessGraph />
        <PlansGraph />
      </div>
      <LastPayments />
    </div>
  )
}