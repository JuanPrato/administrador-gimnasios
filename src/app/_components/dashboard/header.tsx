import { Plus, UserPlus } from "lucide-react";
import { SubTitle, Title } from "../common/typography";
import { Button } from "../ui/button";
import { NewClientModal } from "./user_modal";
import { UserNav } from "../common/user_avatar";
import dayjs from "dayjs";
import { getCurrentMonth } from "~/lib/utils";


export function DashboardHeader() {

  const month = getCurrentMonth();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <Title>Dashboard Administrativo</Title>
        <SubTitle>Resumen del mes actual - {month ?? "0"} {dayjs().year().toString()}</SubTitle>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <NewClientModal
          trigger={
            <Button className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Agregar nuevo cliente
            </Button>
          }
        />
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Plus className="h-4 w-4" />
          Crear nuevo plan
        </Button>
        <UserNav />
      </div>
    </div>

  );
}