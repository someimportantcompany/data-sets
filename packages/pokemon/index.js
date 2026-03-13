import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

/** @type {import('./index.d.ts').PokemonRecord[]} */
const records = require('./data.json');

/** @type {Map<number, import('./index.d.ts').PokemonRecord>} */
const byId = new Map();
/** @type {Map<string, import('./index.d.ts').PokemonRecord>} */
const byNameLower = new Map();

for (const record of records) {
  byId.set(record.id, record);
  byNameLower.set(record.name.toLowerCase(), record);
}

/** @type {import('./index.d.ts').PokemonRecord[]} */
export const data = records;

/**
 * Find a Pokemon by its Pokedex number.
 * @param {number} id
 * @returns {import('./index.d.ts').PokemonRecord | undefined}
 */
export function findById(id) {
  return byId.get(id);
}

/**
 * Find a Pokemon by name (case-insensitive).
 * @param {string} name
 * @returns {import('./index.d.ts').PokemonRecord | undefined}
 */
export function findByName(name) {
  return byNameLower.get(name.toLowerCase());
}

/**
 * Find all Pokemon of a given type.
 * @param {string} type
 * @returns {import('./index.d.ts').PokemonRecord[]}
 */
export function findByType(type) {
  return records.filter(r => r.types.includes(type));
}

export default { data, findById, findByName, findByType };
