# @data-sets/countries

[![NPM](https://badge.fury.io/js/@data-sets%2Fcountries.svg)](https://npm.im/@data-sets/countries)
[![CI](https://github.com/someimportantcompany/data-sets/workflows/CI/badge.svg?branch=main)](https://github.com/someimportantcompany/data-sets/actions?query=branch%3Amain)
[![Typescript](https://img.shields.io/badge/TS-TypeScript-%230074c1.svg)](https://www.typescriptlang.org)

A static list of countries to use in your own projects & services.

```ts
import countries from '@data-sets/countries';
// or
// const countries = require('@data-sets/countries');

console.log(countries.findByCode('US'));
// { id: 'Q30',
//   name: 'United States of America',
//   iso2: 'US',
//   iso3: 'USA',
//   phonePrefix: '+1',
//   currencyId: 'Q4917',
//   currencyCode: 'USD',
//   population: '331449281',
//   latlon: [ '-98.5795', '39.828175' ],
//   emergencyPhone: '911',
//   internetTlds: [ '.us' ],
//   continentId: 'Q49',
//   continentName: 'North America',
//   capitalId: 'Q61',
//   capitalName: 'Washington, D.C.' }

console.log(countries.findByCode('GB'));
// { id: 'Q145',
//   name: 'United Kingdom',
//   iso2: 'GB',
//   iso3: 'GBR',
//   phonePrefix: '+44',
//   currencyId: 'Q25224',
//   currencyCode: 'GBP',
//   population: '67326569',
//   latlon: [ '-2.0', '54.6' ],
//   emergencyPhone: '112',
//   internetTlds: [ '.uk', '.gb' ],
//   continentId: 'Q46',
//   continentName: 'Europe',
//   capitalId: 'Q84',
//   capitalName: 'London' }
```

## Install

```
npm install --save @data-sets/countries
```

## API

### `data`

Import the complete list of countries, as an array, so you can `filter`/`find`/`map`/`reduce` as you please:

```ts
import { data } from '@data-sets/countries';

const selection = data.filter(({ currencyCode }) => {
  return ['USD', 'GBP', 'EUR'].includes(currencyCode);
});
```
```js
const countries = require('@data-sets/countries');

const selection = countries.data.filter(({ currencyCode }) => {
  return ['USD', 'GBP', 'EUR'].includes(currencyCode);
});
```

### `findByCode`

Get a country by their [`ISO 3166-1 alpha-2`](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or [`ISO 3166-1 alpha-3`](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) code. Returns `undefined` if the country is not found.

```ts
import { findByCode } from '@data-sets/countries';

const country = findByCode('US');
```
```ts
const countries = require('@data-sets/countries');

const country = countries.findByCode('USA');
```

## Notes

- Data from a [Wikidata](https://www.wikidata.org) [SPARQL](https://github.com/someimportantcompany/data-sets/blob/main/packages/countries/build.ts) query.
  - The [raw data](./data.md) is available for you to review.
- View more [data-sets](https://github.com/someimportantcompany/data-sets) available for use.
- Questions? Please [open an issue](https://github.com/someimportantcompany/data-sets/issues)!
