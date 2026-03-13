export type CurrencyRecord = {
  code: string;
  numericCode: string;
  name: string;
  symbol: string;
  decimalPlaces: number;
  countries: string[];
};

export const data: CurrencyRecord[];

export function findByCode(code: string): CurrencyRecord | undefined;
export function findByName(name: string): CurrencyRecord | undefined;
export function findByCountry(country: string): CurrencyRecord[];

declare const currencies: {
  data: CurrencyRecord[];
  findByCode: typeof findByCode;
  findByName: typeof findByName;
  findByCountry: typeof findByCountry;
};
export default currencies;
