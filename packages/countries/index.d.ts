export { CountryCodes } from './data';

export type CountryRecord = {
  id: string,
  name: string,
  iso2: string,
  iso3: string,
  phonePrefix: string,
  currencyId: string,
  currencyCode: string,
  population: string,
  latlon: [string, string],
  emergencyPhone: string,
  geonameId: string,
  internetTlds: string[],
  // timezones?: string[],
  // languages?: string[],
  continent: string,
  capitalCity: string,
};

/**
 * List all countries.
 */
const data: CountryRecord[];
export { data };

/**
 * Find a country by its country code.
 */
export function findByCode(code: string): CountryRecord | undefined;

export default {
  data,
  findByCode,
};
