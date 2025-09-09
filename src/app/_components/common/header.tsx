"use client";

import { SubTitle, Title } from "./typography";
import { NewClientModal } from "../dashboard/user_modal";
import { UserNav } from "./user_avatar";
import dayjs from "dayjs";
import { getCurrentMonth } from "~/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGES, PAGES_TITLES } from "~/lib/const";


export function Header() {

  const month = getCurrentMonth();
  const path = usePathname();

  function getClasses(route: keyof typeof PAGES) {
    return `px-3 py-2 rounded ${ifCurrentReturn(route, "bg-black/25")}`;
  }

  function ifCurrentReturn(route: keyof typeof PAGES, ret: string) {
    if (path === PAGES[route]) return ret;
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <Title>{PAGES_TITLES[path as keyof typeof PAGES_TITLES]}</Title>
        <SubTitle>Resumen del mes actual - {month ?? "0"} {dayjs().year().toString()}</SubTitle>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <nav className="flex justify-center items-center mr-2 divide-x">
          <Link href={"/"} className={getClasses("dashboard")}>Inicio</Link>
          <Link href={"/clientes"} className={getClasses("clients")}>Clientes</Link>
          <Link href={"/entradas"} className={getClasses("entries")}>Entradas</Link>
          <Link href={"/planes"} className={getClasses("plans")}>Planes</Link>
        </nav>
        <NewClientModal />
        <UserNav />
      </div>
    </div>

  );
}