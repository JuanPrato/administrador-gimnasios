"use client";

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
import { capitalize, getCurrentMonth, getCurrentYear } from "~/lib/utils";
import { api } from "~/trpc/react";
import dayjs from "dayjs";

export function AccessGraph() {

  const monthAndYear = `${capitalize(getCurrentMonth() ?? "")} ${getCurrentYear()}`;

  const { data: stats } = api.gym.getLastMonthAccess.useQuery();

  function createMonthCompleteData() {

    const dMonths = dayjs().daysInMonth();
    const data = [];

    for (let i = 1; i <= dMonths; i++) {

      const s = stats?.find(stat => dayjs(stat.date).date() === i);

      data[i - 1] = { day: i.toString(), accesos: s?.count }
    }

    return data;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Accesos Diarios - {monthAndYear}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={createMonthCompleteData()}>
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