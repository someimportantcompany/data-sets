# @data-sets/countries

A static list of countries to use in your application.


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
//   timezones: [
//     'UTC−12:00', 'UTC−11:00',
//     'UTC−09:00', 'UTC−08:00',
//     'UTC−07:00', 'UTC−06:00',
//     'UTC−05:00', 'UTC−04:00',
//     'UTC+10:00', 'UTC+12:00'
//   ],
//   languages: [ 'English' ],
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
//   timezones: [ 'UTC±00:00' ],
//   languages: [ 'English' ],
//   continentId: 'Q46',
//   continentName: 'Europe',
//   capitalId: 'Q84',
//   capitalName: 'London' }
```
