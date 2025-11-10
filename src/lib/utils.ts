import { Period } from "@/app/actions/workspace";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncateString = (string: string, slice?: number) => {
  return string.slice(0, slice || 30) + "...";
};


export const getDateRange = (period: Period) => {
  const now = new Date();
  let from: Date | undefined;

  switch (period) {
    case Period.LAST_24_HOURS:
      from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      break;

    case Period.LAST_7_DAYS:
      from = new Date(now);
      from.setDate(from.getDate() - 7);
      break;

    case Period.LAST_30_DAYS:
      from = new Date(now);
      from.setDate(from.getDate() - 30);
      break;

    case Period.LAST_6_MONTHS:
      from = new Date(now);
      from.setMonth(from.getMonth() - 6);
      break;

    case Period.LAST_1_YEAR:
      from = new Date(now);
      from.setFullYear(from.getFullYear() - 1);
      break;

    case Period.LIFETIME:
      return undefined;

    default:
      return undefined;
  }

  return { gte: from, lte: new Date() };
}