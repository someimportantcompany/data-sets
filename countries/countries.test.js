const assert = require('assert');

describe('@data-sets/countries', () => {
  const countries = require('./countries.js');

  describe('data', () => {
    before(() => {
      const { data } = countries;
      assert.ok(Array.isArray(data) && data.length, 'Expected data to be an array');
    });

    it('should have a unique code for the data', () => {
      const { data } = countries;
      data.forEach(({ code }) => {
        assert(code, 'Expected each entry to have a code');
        const uniqueCheck = data.filter(r => r.code === code || r.code_alt === code).length;
        assert(uniqueCheck === 1, `Expected code:${code} to be unique across the data set`);
      });
    });

    it('should have a unique code_alt for the data', () => {
      const { data } = countries;
      data.filter(({ code_alt }) => code_alt).forEach(({ code_alt }) => {
        const uniqueCheck = data.filter(r => r.code === code_alt || r.code_alt === code_alt).length;
        assert(uniqueCheck === 1, `Expected code_alt:${code_alt} to be unique across the data set`);
      });
    });

    it('should have a unique name for the data', () => {
      const { data } = countries;
      data.forEach(({ name }) => {
        assert(name, 'Expected each entry to have a name');
        const uniqueCheck = data.filter(r => r.name === name || r.name_alt === name).length;
        assert(uniqueCheck === 1, `Expected name:${name} to be unique across the data set`);
      });
    });

    it('should have a unique name_alt for the data', () => {
      const { data } = countries;
      data.filter(({ name_alt }) => name_alt).forEach(({ name_alt }) => {
        const uniqueCheck = data.filter(r => r.name === name_alt || r.name_alt === name_alt).length;
        assert(uniqueCheck === 1, `Expected name_alt:${name_alt} to be unique across the data set`);
      });
    });
  });

  describe('#findByCode', () => {
    before(() => {
      const { findByCode } = countries;
      assert.strictEqual(typeof findByCode, 'function', 'Expected findByCode to be a function');
    });

    it('should have a find a country for "GB" 🇬🇧 ', () => {
      const { GB: expected } = mocked;
      assert.ok(expected, 'Expected GB result to exist');

      const { findByCode } = countries;
      const actual = findByCode('GB');
      assert.deepStrictEqual(actual, expected);
    });

    it('should have a find a country for "UK" 🇬🇧 ', () => {
      const { GB: expected } = mocked;
      assert.ok(expected, 'Expected GB result to exist');

      const { findByCode } = countries;
      const actual = findByCode('UK');
      assert.deepStrictEqual(actual, expected);
    });

    it('should have a find a country for "US" 🇺🇸 ', () => {
      const { US: expected } = mocked;
      assert.ok(expected, 'Expected US result to exist');

      const { findByCode } = countries;
      const actual = findByCode('US');
      assert.deepStrictEqual(actual, expected);
    });

    it('should have a find a country for "USA" 🇺🇸 ', () => {
      const { US: expected } = mocked;
      assert.ok(expected, 'Expected US result to exist');

      const { findByCode } = countries;
      const actual = findByCode('USA');
      assert.deepStrictEqual(actual, expected);
    });

    it('should return null if an invalid argument is given', () => {
      const { findByCode } = countries;
      const actual = findByCode(1);
      assert.strictEqual(actual, null);
    });
  });

  describe('#findByName', () => {
    before(() => {
      const { findByName } = countries;
      assert.strictEqual(typeof findByName, 'function', 'Expected findByName to be a function');
    });

    it('should have a find a country for "United Kingdom" 🇬🇧 ', () => {
      const { GB: expected } = mocked;
      assert.ok(expected, 'Expected GB result to exist');

      const { findByName } = countries;
      const actual = findByName('United Kingdom');
      assert.deepStrictEqual(actual, expected);
    });

    it('should have a find a country for "United States" 🇺🇸 ', () => {
      const { US: expected } = mocked;
      assert.ok(expected, 'Expected GB result to exist');

      const { findByName } = countries;
      const actual = findByName('United States');
      assert.deepStrictEqual(actual, expected);
    });

    it('should return null if an invalid argument is given', () => {
      const { findByName } = countries;
      const actual = findByName(1);
      assert.strictEqual(actual, null);
    });
  });
});

const mocked = {
  GB: {
    name: 'United Kingdom',
    code: 'GB',
    iso3: 'GBR',
    latlon: '54.75844,-2.69531',
    continent: 'EU',
    capital: 'London',
    currency: {
      code: 'GBP',
      name: 'Pound'
    },
    languages: [
      'EN-GB',
      'CY-GB',
      'GD'
    ],
    neighbours: [
      'IE'
    ],
    population: 66488991,
    timezone: 'Europe/London',
    code_alt: 'UK',
    name_alt: 'Great Britain',
  },
  US: {
    name: 'United States',
    code: 'US',
    iso3: 'USA',
    latlon: '39.76,-98.5',
    continent: 'NA',
    capital: 'Washington',
    currency: {
      code: 'USD',
      name: 'Dollar'
    },
    languages: [
      'EN-US',
      'ES-US',
      'HAW',
      'FR'
    ],
    neighbours: [
      'CA',
      'MX',
      'CU'
    ],
    population: 327167434,
    timezone: null,
    code_alt: 'USA'
  },
};
