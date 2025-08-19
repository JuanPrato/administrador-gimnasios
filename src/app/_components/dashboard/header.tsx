import { Plus, UserPlus } from "lucide-react";
import { SubTitle, Title } from "../common/typography";
import { Button } from "../ui/button";
import { NewClientModal } from "./user_modal";
import { UserNav } from "../common/user_avatar";
import dayjs from "dayjs";
import { getCurrentMonth } from "~/lib/utils";
import Link from "next/link";


export function DashboardHeader() {

  const month = getCurrentMonth();

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <Title>Dashboard Administrativo</Title>
        <SubTitle>Resumen del mes actual - {month ?? "0"} {dayjs().year().toString()}</SubTitle>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <nav className="flex justify-center items-center mr-2 divide-x">
          <Link href={""} className="px-3">Clientes</Link>
          <Link href={""} className="px-3">Entradas</Link>
          <Link href={""} className="px-3">Planes</Link>
        </nav>
        <NewClientModal />
        <UserNav />
      </div>
    </div>

  );
}