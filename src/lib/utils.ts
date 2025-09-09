import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import localeData from "dayjs/plugin/localeData";
import es from "dayjs/locale/es";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount);
};

export const formatDate = (date: string | Date) => {
  switch (typeof date) {
    case "string":
      return new Date(date).toLocaleDateString("es-AR");
    case "object":
      return dayjs(date).format("DD/MM/YYYY");
  }
};

dayjs.extend(localeData);
dayjs.locale("es");

export const getCurrentYear = () => {
  return dayjs().year();
};

export const getCurrentMonth = () => {
  return es.months?.at(dayjs().month());
};

export const capitalize = (word: string) => {
  return word.substring(0, 1).toUpperCase() + word.substring(1);
};
