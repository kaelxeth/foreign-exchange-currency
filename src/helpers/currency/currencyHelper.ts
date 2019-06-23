import CurrencyISO from "../../static/iso4217.json";
import { AVAILABLE_CURRENCIES } from "./currencyConstant";

export function calculateRatesByBaseValue(
  rates: { [key: string]: any },
  value: number
) {
  const calculatedRates: { [key: string]: any } = {};
  const baseRate: { [key: string]: any } = { ...rates };
  Object.keys(baseRate).forEach((rate: string) => {
    calculatedRates[rate] = Number(baseRate[rate]) * value;
  });
  return calculatedRates;
}

export function toISOCurrencyName(currencyCode: string) {
  return ((CurrencyISO as { [key: string]: any })[currencyCode] || {}).name;
}

export type CurrencyOption = {
  label: string;
  value: string;
};

export type CurrencyOptions = CurrencyOption[];

export const currencyOptions: CurrencyOptions = AVAILABLE_CURRENCIES.map(
  currency => ({
    value: currency,
    label: currency
  })
);
