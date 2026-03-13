# @data-sets/countries

Static data-set of countries (ISO 3166), with lookup methods for convenience.

## Install

```bash
npm install @data-sets/countries
# or
pnpm add @data-sets/countries
```

## Usage

```js
import { data, findByCode, findByName, findByContinent } from '@data-sets/countries';

// Find a country by ISO 3166-1 alpha-2 or alpha-3 code
const gb = findByCode('GB');
// { name: 'United Kingdom', iso2: 'GB', iso3: 'GBR', continent: 'Europe', ... }

const usa = findByCode('USA');
// { name: 'United States of America', iso2: 'US', iso3: 'USA', ... }

// Find a country by name (case-insensitive)
const japan = findByName('japan');
// { name: 'Japan', iso2: 'JP', iso3: 'JPN', continent: 'Asia', ... }

// Find all countries on a continent
const european = findByContinent('Europe');
// [ { name: 'Albania', ... }, { name: 'Andorra', ... }, ... ]
```

A default export is also available:

```js
import countries from '@data-sets/countries';

countries.findByCode('FR');
```

## Data Shape

Each record has the following shape:

```ts
type CountryRecord = {
  name: string;
  iso2: string;        // ISO 3166-1 alpha-2 (e.g. "GB")
  iso3: string;        // ISO 3166-1 alpha-3 (e.g. "GBR")
  continent: string;
  capitalCity: string;
  phonePrefix: string; // e.g. "+44"
  currencyCode: string;
  population: number;
};
```

## Raw Data

You can also import the raw JSON directly:

```js
import data from '@data-sets/countries/data.json';
```

## License

MIT
