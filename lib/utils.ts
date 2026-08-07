import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn-style class combiner: clsx for conditional classes, tailwind-merge to resolve
 * conflicting Tailwind utilities (e.g. `p-2 p-4` -> `p-4`) when a component's default
 * classes are overridden by a caller-supplied `className`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
