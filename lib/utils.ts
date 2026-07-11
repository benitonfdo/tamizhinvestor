import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, locale: 'ta' | 'en' = 'ta'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale === 'ta' ? 'ta-IN' : 'en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(date: string | Date, locale: 'ta' | 'en' = 'ta'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale === 'ta' ? 'ta-IN' : 'en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function readingTimeMinutes(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}