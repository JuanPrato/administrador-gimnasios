import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatCurrency, formatDate } from "~/lib/utils";
import type { AppRouter } from "~/server/api/root";

type ClientTableProps = {
  clients: Awaited<ReturnType<AppRouter["user"]["getClientUsers"]>>;
};

export async function ClientTable({ clients }: ClientTableProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Todos los clientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dni</TableHead>
                <TableHead>Nombre completo</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Último pago</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(clients ?? []).map(({ plans: plan, profiles: profile, payments: payment }) => (
                <TableRow key={profile.id}>
                  <TableCell className="font-medium">{profile.dni}</TableCell>
                  <TableCell>
                    <div>
                      <p>{`${profile.name} ${profile.surname}`}</p>
                      <p className="text-black/60">{profile.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge style={{ backgroundColor: plan.color ?? "" }}>{plan.name}</Badge>
                  </TableCell>
                  <TableCell>
                    {
                      payment ? (
                        <div>
                          <p className="font-bold">{formatDate(payment.payAt)}</p>
                          <p>{formatCurrency(payment.total)}</p>
                        </div>
                      ) : "-"
                    }
                  </TableCell>
                  <TableCell><Badge variant={profile.active ? "default" : "destructive"}>{profile.active ? "Activo" : "Inactivo"}</Badge></TableCell>
                  <TableCell className="text-right font-medium">
                    <Button variant="secondary" asChild>
                      <Link href={`/clientes/${profile.dni}`}>Ver más</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

}