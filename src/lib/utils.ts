import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts escaped newline characters (\n) in strings to actual line breaks.
 * Useful for rendering content from database that contains literal \n strings.
 */
export function formatContent(content: string): string {
  if (!content) return '';
  return content.replace(/\\n/g, '\n');
}
