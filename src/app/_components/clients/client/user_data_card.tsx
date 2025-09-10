import { Mail, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { formatDate, getInitials } from "~/lib/utils";
import { Separator } from "../../ui/separator";
import type { AppRouter } from "~/server/api/root";
import dayjs from "dayjs";

interface UserDataCardProps {
  clientData: NonNullable<Awaited<ReturnType<AppRouter["user"]["getUserByDni"]>>>;
  movements: Awaited<ReturnType<AppRouter["user"]["getUserMovements"]>>;
}

export function UserDataCard({ clientData: { profiles: clientData, plans: plan }, movements }: UserDataCardProps) {

  const expireDate = dayjs(movements.payments[0]?.payAt).add(1, 'month').toDate();

  return (
    <Card className="lg:col-span-1">
      <CardHeader className="text-center">
        <Avatar className="h-24 w-24 mx-auto">
          <AvatarFallback className="text-lg bg-primary text-primary-foreground">
            {getInitials(clientData.name, clientData.surname)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">
          {clientData.name} {clientData.surname}
        </CardTitle>
        <div className="flex justify-center gap-2">
          <Badge>{clientData.active ? "Activo" : "Inactivo"}</Badge>
          <Badge>{plan.name}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{clientData.age} años</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>-</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="break-all">{clientData.email}</span>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fecha de inicio:</span>
            <span>{formatDate(clientData.createdAt)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Vencimiento:</span>
            <span>{formatDate(expireDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Último acceso:</span>
            <span>{formatDate(movements.entries[0]?.createdAt ?? new Date())}</span>
          </div>
        </div>
      </CardContent>
    </Card>

  );
}