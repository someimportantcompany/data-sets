export type CountryRecord = {
  name: string;
  iso2: string;
  iso3: string;
  continent: string;
  capitalCity: string;
  phonePrefix: string;
  currencyCode: string;
  population: number;
};

export const data: CountryRecord[];

export function findByCode(code: string): CountryRecord | undefined;
export function findByName(name: string): CountryRecord | undefined;
export function findByContinent(continent: string): CountryRecord[];

declare const countries: {
  data: CountryRecord[];
  findByCode: typeof findByCode;
  findByName: typeof findByName;
  findByContinent: typeof findByContinent;
};
export default countries;
