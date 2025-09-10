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
  const pathName = usePathname();

  const path = ("/" + pathName.split("/")[1]);

  function getClasses(route: keyof typeof PAGES) {
    const className = `px-3 py-2 ${ifCurrentReturn(route, "text-black font-bold border-b-2 border-black", "text-black/60 hover:text-black")} transition`;
    return className;
  }

  function ifCurrentReturn(route: keyof typeof PAGES, ret: string, alt?: string) {
    if (path === PAGES[route]) return ret;
    if (alt) return alt;
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <Title>{PAGES_TITLES[path as keyof typeof PAGES_TITLES]}</Title>
        <SubTitle>Resumen del mes actual - {month ?? "0"} {dayjs().year().toString()}</SubTitle>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <nav className="flex justify-center items-center mr-2">
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