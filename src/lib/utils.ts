import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Currency symbol mapping
const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹',
  PKR: 'Rs',
  AUD: 'A$',
  CAD: 'C$',
  CNY: '¥',
  AED: 'د.إ',
  SAR: '﷼',
  BDT: '৳',
  NGN: '₦',
  ZAR: 'R',
  BRL: 'R$',
  MXN: 'MX$',
};

/**
 * Get currency symbol from currency code
 * @param currencyCode - ISO 4217 currency code (e.g., 'USD', 'EUR', 'PKR')
 * @returns Currency symbol or code if symbol is not available
 */
export function getCurrencySymbol(currencyCode?: string): string {
  if (!currencyCode) return '$';
  return currencySymbols[currencyCode.toUpperCase()] || currencyCode;
}

/**
 * Format price with currency
 * @param price - Price value
 * @param currency - Currency code (e.g., 'USD', 'PKR')
 * @returns Formatted price with currency symbol
 */
export function formatPrice(price: number, currency?: string): string {
  const symbol = getCurrencySymbol(currency);
  
  // For currencies like PKR, INR, place symbol before the number with space
  if (['Rs', '₹', '﷼', 'R', '৳', '₦'].includes(symbol)) {
    return `${symbol} ${price.toLocaleString()}`;
  }
  
  // For USD, EUR, GBP, etc., place symbol directly before number
  return `${symbol}${price.toLocaleString()}`;
}
