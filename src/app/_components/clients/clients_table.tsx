import { api } from "~/trpc/server";

import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatDate } from "~/lib/utils";
import type { ClientsFilterType } from "~/app/clientes/page";

export async function ClientTable({ params }: { params: ClientsFilterType }) {

  const clients = await api.user.getClientUsers({ plan: params.plan, search: params.search, status: params.status });

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
                  <TableCell>{`${profile.name} ${profile.surname}`}</TableCell>
                  <TableCell>
                    <Badge style={{ backgroundColor: plan.color ?? "" }}>{plan.name}</Badge>
                  </TableCell>
                  <TableCell>{payment ? formatDate(payment.payAt) : "-"}</TableCell>
                  <TableCell>{profile.active ? "Activo" : "Inactivo"}</TableCell>
                  <TableCell className="text-right font-medium">
                    <Button variant="secondary" asChild>
                      <Link href={`/clientes/${profile.userId}`}>Ver más</Link>
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