import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseTheme = (theme: string) => {
  const [color, code] = theme.split("#");
  return { color, code: `#${code}` };
};
