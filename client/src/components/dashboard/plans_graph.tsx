import { Users } from "lucide-react"
import { ResponsiveContainer, Pie, Cell, Tooltip, PieChart } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { usePlans } from "@/lib/plans";
import { useEffect } from "react";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export function PlansGraph() {

  const { plans, stats, getClientsPerPlan } = usePlans();

  useEffect(() => {
    getClientsPerPlan();
  }, [getClientsPerPlan]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Distribución por Tipo de Plan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={plans?.map(p => ({ ...p, value: (stats?.find(s => s.plan === p.id)?.count || 0) }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {plans?.map((plan, index) => (
                  <Cell key={`cell-${index}`} fill={plan.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, "Clientes"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {plans?.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <span className="text-sm text-gray-600">
                {entry.name}: {(stats?.find(s => s.plan === entry.id)?.count || 0)} clientes
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

}