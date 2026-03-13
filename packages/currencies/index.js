import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/** @type {import('./index.d.ts').CurrencyRecord[]} */
const records = require('./data.json');

/** @type {Map<string, import('./index.d.ts').CurrencyRecord>} */
const byCode = new Map();
/** @type {Map<string, import('./index.d.ts').CurrencyRecord>} */
const byNumericCode = new Map();
/** @type {Map<string, import('./index.d.ts').CurrencyRecord>} */
const byNameLower = new Map();

for (const record of records) {
  byCode.set(record.code, record);
  byNumericCode.set(record.numericCode, record);
  byNameLower.set(record.name.toLowerCase(), record);
}

/** @type {import('./index.d.ts').CurrencyRecord[]} */
export const data = records;

/**
 * Find a currency by its ISO 4217 alpha or numeric code.
 * @param {string} code
 * @returns {import('./index.d.ts').CurrencyRecord | undefined}
 */
export function findByCode(code) {
  return byCode.get(code) ?? byNumericCode.get(code);
}

/**
 * Find a currency by name (case-insensitive).
 * @param {string} name
 * @returns {import('./index.d.ts').CurrencyRecord | undefined}
 */
export function findByName(name) {
  return byNameLower.get(name.toLowerCase());
}

/**
 * Find all currencies used in a given country (case-insensitive).
 * @param {string} country
 * @returns {import('./index.d.ts').CurrencyRecord[]}
 */
export function findByCountry(country) {
  const lower = country.toLowerCase();
  return records.filter(r => r.countries.some(c => c.toLowerCase() === lower));
}

export default { data, findByCode, findByName, findByCountry };
