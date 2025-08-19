import { formatCurrency, formatDate } from "~/lib/utils";
import { Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Badge } from "../ui/badge";
import { api } from "~/trpc/server";

export async function LastPayments() {

  const payments = await api.gym.getLastPayments();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Últimos Pagos Registrados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Monto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(payments ?? []).map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.name}</TableCell>
                  <TableCell>{formatDate(payment.date)}</TableCell>
                  <TableCell>
                    <Badge style={{ backgroundColor: payment.plan.color ?? "" }}>{payment.plan.name}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(payment.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

}