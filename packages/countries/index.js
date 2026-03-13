import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/** @type {import('./index.d.ts').CountryRecord[]} */
const records = require('./data.json');

/** @type {Map<string, import('./index.d.ts').CountryRecord>} */
const byIso2 = new Map();
/** @type {Map<string, import('./index.d.ts').CountryRecord>} */
const byIso3 = new Map();
/** @type {Map<string, import('./index.d.ts').CountryRecord>} */
const byNameLower = new Map();

for (const record of records) {
  byIso2.set(record.iso2, record);
  byIso3.set(record.iso3, record);
  byNameLower.set(record.name.toLowerCase(), record);
}

/** @type {import('./index.d.ts').CountryRecord[]} */
export const data = records;

/**
 * Find a country by its ISO 3166-1 alpha-2 or alpha-3 code.
 * @param {string} code
 * @returns {import('./index.d.ts').CountryRecord | undefined}
 */
export function findByCode(code) {
  return byIso2.get(code) ?? byIso3.get(code);
}

/**
 * Find a country by name (case-insensitive).
 * @param {string} name
 * @returns {import('./index.d.ts').CountryRecord | undefined}
 */
export function findByName(name) {
  return byNameLower.get(name.toLowerCase());
}

/**
 * Find all countries on a given continent.
 * @param {string} continent
 * @returns {import('./index.d.ts').CountryRecord[]}
 */
export function findByContinent(continent) {
  return records.filter(r => r.continent === continent);
}

export default { data, findByCode, findByName, findByContinent };
