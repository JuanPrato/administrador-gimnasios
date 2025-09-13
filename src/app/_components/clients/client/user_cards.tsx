import { Activity, CreditCard, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { formatCurrency } from "~/lib/utils";

interface Props {
  movements: {
    payments: { total: number }[];
    entries: unknown[];
  };
}

export function UserCards({ movements }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pagos Realizados</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{movements.payments.length}</div>
          <p className="text-xs text-muted-foreground">Total de pagos</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Accesos Este Mes</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{movements.entries.length}</div>
          <p className="text-xs text-muted-foreground">Visitas registradas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(movements.payments.reduce((sum, payment) => sum + payment.total, 0))}
          </div>
          <p className="text-xs text-muted-foreground">Suma total</p>
        </CardContent>
      </Card>
    </div>

  );
}