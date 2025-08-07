import { formatCurrency, formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Badge } from "../ui/badge";

// Datos para la tabla de últimos pagos
const recentPayments = [
  { id: 1, cliente: "María González", fecha: "2024-01-15", monto: 150, plan: "Premium" },
  { id: 2, cliente: "Carlos Rodríguez", fecha: "2024-01-15", monto: 100, plan: "Básico" },
  { id: 3, cliente: "Ana Martínez", fecha: "2024-01-14", monto: 200, plan: "Full Access" },
  { id: 4, cliente: "Luis Fernández", fecha: "2024-01-14", monto: 150, plan: "Premium" },
  { id: 5, cliente: "Sofia López", fecha: "2024-01-13", monto: 100, plan: "Básico" },
  { id: 6, cliente: "Diego Morales", fecha: "2024-01-13", monto: 200, plan: "Full Access" },
  { id: 7, cliente: "Carmen Ruiz", fecha: "2024-01-12", monto: 150, plan: "Premium" },
  { id: 8, cliente: "Roberto Silva", fecha: "2024-01-12", monto: 100, plan: "Básico" },
];

const getPlanBadgeVariant = (plan: string) => {
  switch (plan) {
    case "Básico":
      return "secondary"
    case "Premium":
      return "default"
    case "Full Access":
      return "destructive"
    default:
      return "outline"
  }
}

export function LastPayments() {

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
              {recentPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.cliente}</TableCell>
                  <TableCell>{formatDate(payment.fecha)}</TableCell>
                  <TableCell>
                    <Badge variant={getPlanBadgeVariant(payment.plan)}>{payment.plan}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(payment.monto)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

}