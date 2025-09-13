"use client";

import { Activity, CreditCard } from "lucide-react";
import { formatDate, formatCurrency } from "~/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import type { AppRouter } from "~/server/api/root";
import { useState } from "react";

type Payment = {
  id: number;
  payAt: Date;
  plan: number;
  total: number;
  profile: number;
};

type Entry = {
  id: number;
  profile: number;
  createdAt: Date;
};

type Movement = Payment | Entry;

function isPayment(m: Movement): m is Payment {
  return "payAt" in m;
}

interface Props {
  movements: Awaited<ReturnType<AppRouter["user"]["getUserMovements"]>>;
}

function getFilteredMovements(movements: Props["movements"], filter: "todos" | "pagos" | "accesos") {
  if (filter === "todos") {
    return [...movements.payments, ...movements.entries].sort((a, b) => {
      const dateA = isPayment(a) ? a.payAt.getTime() : a.createdAt.getTime();
      const dateB = isPayment(b) ? b.payAt.getTime() : b.createdAt.getTime();

      return dateB - dateA;
    });
  } else if (filter === "pagos") {
    return movements.payments;
  } else {
    return movements.entries;
  }
}

export function MovementsTable({ movements }: Props) {

  const [movementFilter, setMovementFilter] = useState<"todos" | "pagos" | "accesos">("todos");

  const filteredMovements = getFilteredMovements(movements, movementFilter);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Movimientos Recientes
          </CardTitle>
          <Select value={movementFilter} onValueChange={(v) => setMovementFilter(v as "todos" | "pagos" | "accesos")}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pagos">Pagos</SelectItem>
              <SelectItem value="accesos">Accesos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredMovements.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No hay movimientos para mostrar</p>
          ) : (
            filteredMovements.map((movement) => (
              <div
                key={`${isPayment(movement) ? "pago" : "acceso"}-${movement.id}`}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${isPayment(movement) ? "bg-green-100" : "bg-blue-100"}`}
                  >
                    {isPayment(movement) ? (
                      <CreditCard
                        className={`h-4 w-4 ${isPayment(movement) ? "text-green-600" : "text-blue-600"}`}
                      />
                    ) : (
                      <Activity
                        className={`h-4 w-4 ${isPayment(movement) ? "text-green-600" : "text-blue-600"}`}
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm">
                      {isPayment(movement) ? "Pago de cuota" : "Acceso al gimnasio"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(isPayment(movement) ? movement.payAt : movement.createdAt)} {isPayment(movement) ? `- ${movement.payAt.toDateString()}` : ` - ${movement.createdAt.toDateString()}`}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {isPayment(movement) && (
                    <div className="font-medium text-green-600">{formatCurrency(movement.total)}</div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}