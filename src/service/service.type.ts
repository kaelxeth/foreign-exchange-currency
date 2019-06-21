export interface RatesLatestResponse {
  base: string;
  date: string;
  rates: { [key: string]: any }
}