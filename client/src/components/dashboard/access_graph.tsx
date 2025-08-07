import { Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Datos para el gráfico de accesos diarios
const dailyAccessData = [
  { day: "1", accesos: 45 },
  { day: "2", accesos: 52 },
  { day: "3", accesos: 48 },
  { day: "4", accesos: 61 },
  { day: "5", accesos: 55 },
  { day: "6", accesos: 67 },
  { day: "7", accesos: 43 },
  { day: "8", accesos: 58 },
  { day: "9", accesos: 62 },
  { day: "10", accesos: 51 },
  { day: "11", accesos: 59 },
  { day: "12", accesos: 65 },
  { day: "13", accesos: 48 },
  { day: "14", accesos: 44 },
  { day: "15", accesos: 57 },
  { day: "16", accesos: 63 },
  { day: "17", accesos: 69 },
  { day: "18", accesos: 54 },
  { day: "19", accesos: 58 },
  { day: "20", accesos: 61 },
  { day: "21", accesos: 47 },
  { day: "22", accesos: 52 },
  { day: "23", accesos: 66 },
  { day: "24", accesos: 59 },
  { day: "25", accesos: 63 },
  { day: "26", accesos: 57 },
  { day: "27", accesos: 61 },
  { day: "28", accesos: 55 },
  { day: "29", accesos: 49 },
  { day: "30", accesos: 58 },
];

export function AccessGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Accesos Diarios - Enero 2024
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailyAccessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip labelFormatter={(value) => `Día ${value}`} formatter={(value) => [value, "Accesos"]} />
              <Line
                type="monotone"
                dataKey="accesos"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}