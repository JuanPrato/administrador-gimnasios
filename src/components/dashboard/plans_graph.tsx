import { Users } from "lucide-react"
import { ResponsiveContainer, Pie, Cell, Tooltip, PieChart } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"

// Datos para el gráfico circular de planes
const planDistributionData = [
  { name: "Básico", value: 156, color: "#8884d8" },
  { name: "Premium", value: 78, color: "#82ca9d" },
  { name: "Full Access", value: 57, color: "#ffc658" },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export function PlansGraph() {

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
                data={planDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {planDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, "Clientes"]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {planDistributionData.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <span className="text-sm text-gray-600">
                {entry.name}: {entry.value} clientes
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

}