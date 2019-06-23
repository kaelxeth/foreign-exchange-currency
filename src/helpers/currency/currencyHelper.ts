import CurrencyISO from '../../static/iso4217.json';

export function calculateRatesByBaseValue(rates: { [key: string]: any }, value: number) {
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
