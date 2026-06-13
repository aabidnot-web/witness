import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

export function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}
