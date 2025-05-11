import { ID_USER, TOKEN } from "@/core/constant";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isAuthenticated = (): boolean => {
  return !!sessionStorage.getItem(TOKEN) && !!sessionStorage.getItem(ID_USER);
};
