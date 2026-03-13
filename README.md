# @data-sets

A monorepo of static, curated data-sets for Node.js. Each package ships a JSON data file, ESM lookup functions, and TypeScript type declarations.

| Package | Description | Records |
|---------|-------------|---------|
| [`@data-sets/countries`](./packages/countries) | ISO 3166 countries | ~190 |
| [`@data-sets/currencies`](./packages/currencies) | ISO 4217 currencies | 154 |
| [`@data-sets/pokemon`](./packages/pokemon) | Gen 1 Pokemon (#001-#151) | 151 |

## Install

Each package is published independently:

```bash
pnpm add @data-sets/countries
pnpm add @data-sets/currencies
pnpm add @data-sets/pokemon
```

## Quick Start

Every package exports a `data` array and a set of lookup functions:

```js
import { findByCode } from '@data-sets/countries';
const gb = findByCode('GB');

import { findByCode as findCurrency } from '@data-sets/currencies';
const usd = findCurrency('USD');

import { findById } from '@data-sets/pokemon';
const pikachu = findById(25);
```

Lookups by primary key (`findByCode`, `findById`) are O(1) via pre-built `Map` indexes. Filter-style lookups (`findByContinent`, `findByType`, `findByCountry`) use `Array.filter`.

See each package's README for the full API and data shape.

## Development

```bash
# Install
pnpm install

# Lint
pnpm lint

# Run all tests (unit then integration)
pnpm test

# Run unit tests only
pnpm test:unit

# Run integration tests only
pnpm test:integration
```

Requires Node.js >= 18.

## License

MIT
