import type { CostItem, TotalDamageVersion } from "./schema";

const moneyFormatters = new Map<string, Intl.NumberFormat>();

export function formatMoney(amountMinor: number, currency: string) {
  let formatter = moneyFormatters.get(currency);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
    moneyFormatters.set(currency, formatter);
  }
  return formatter.format(amountMinor / 100);
}

export function formatMoneyRange(minorMin: number, minorMax: number, currency: string) {
  const minimum = formatMoney(minorMin, currency);
  if (minorMin === minorMax) return minimum;
  return `${minimum}–${formatMoney(minorMax, currency)}`;
}

export function formatTotalDamage(totalDamage: TotalDamageVersion) {
  return formatMoneyRange(
    totalDamage.totals.requiredMonthlyMinMinor,
    totalDamage.totals.requiredMonthlyMaxMinor,
    totalDamage.currency,
  );
}

export function formatCostItem(item: CostItem, currency: string) {
  const amount = formatMoneyRange(item.amountMinMinor, item.amountMaxMinor, currency);
  return `${amount}${item.frequency === "monthly" ? "/mo" : " once"}`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
