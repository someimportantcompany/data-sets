import assert from 'assert';

import * as countries from '@data-sets/countries';

describe('@data-sets/countries', () => {

  let UK: countries.CountryRecord;
  let US: countries.CountryRecord;

  before(() => {
    assert(typeof countries.default === 'object', 'Expected default export to be an object');

    UK = countries.data.find(r => r.iso2 === 'GB')!;
    US = countries.data.find(r => r.iso2 === 'US')!;
    assert(UK?.id, 'Invalid data generated - missing UK');
    assert(US?.id, 'Invalid data generated - missing US');
  });

  describe('#data', () => {
    before(() => {
      assert(Array.isArray(countries.data), 'Expected data export to be an array');
      assert(Array.isArray(countries.default.data), 'Expected default.data export to be an array');
      assert(Array.isArray(countries.data) && countries.data.length > 0, 'Expected a non-empty array to be exported');
    });

    it('should have the United Kingdom in the array of countries', () => {
      const country = countries.data.find(r => r.name === 'United Kingdom');
      assert.deepStrictEqual(country, UK);
    });

    it('should have the United States of America in the array of countries', () => {
      const country = countries.data.find(r => r.name === 'United States of America');
      assert.deepStrictEqual(country, US);
    });
  });

  describe('#findByCode', () => {
    before(() => {
      assert(typeof countries.findByCode === 'function', 'Expected findByCode to be a function');
      assert(typeof countries.default.findByCode === 'function', 'Expected default.findByCode to be a function')
    });

    it('should return the United Kingdom by country code', () => {
      const country = countries.findByCode('GB');
      assert.deepStrictEqual(country, UK);
    });

    it('should return the United States of America by country code', () => {
      const country = countries.findByCode('US');
      assert.deepStrictEqual(country, US);
    });

    it('should return undefined if the country code doesn\'t exist', () => {
      const country = countries.findByCode('UK');
      assert.deepStrictEqual(country, undefined);
    });
  });

});
