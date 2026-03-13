# @data-sets/currencies

Static data-set of currencies (ISO 4217), with lookup methods for convenience.

## Install

```bash
npm install @data-sets/currencies
# or
pnpm add @data-sets/currencies
```

## Usage

```js
import { data, findByCode, findByName, findByCountry } from '@data-sets/currencies';

// Find a currency by ISO 4217 alpha or numeric code
const usd = findByCode('USD');
// { code: 'USD', numericCode: '840', name: 'US Dollar', symbol: '$', ... }

const gbp = findByCode('826');
// { code: 'GBP', numericCode: '826', name: 'Pound Sterling', symbol: '£', ... }

// Find a currency by name (case-insensitive)
const euro = findByName('euro');
// { code: 'EUR', numericCode: '978', name: 'Euro', symbol: '€', ... }

// Find all currencies used in a country (case-insensitive)
const japanese = findByCountry('Japan');
// [ { code: 'JPY', name: 'Yen', symbol: '¥', ... } ]
```

A default export is also available:

```js
import currencies from '@data-sets/currencies';

currencies.findByCode('EUR');
```

## Data Shape

Each record has the following shape:

```ts
type CurrencyRecord = {
  code: string;          // ISO 4217 alpha code (e.g. "USD")
  numericCode: string;   // ISO 4217 numeric code (e.g. "840")
  name: string;
  symbol: string;        // e.g. "$", "£", "€"
  decimalPlaces: number; // 0-3
  countries: string[];   // Countries that use this currency
};
```

## Raw Data

You can also import the raw JSON directly:

```js
import data from '@data-sets/currencies/data.json';
```

## License

MIT
