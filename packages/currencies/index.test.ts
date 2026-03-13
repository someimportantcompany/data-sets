import { describe, it, expect } from 'vitest';
import currencies, { data, findByCode, findByName, findByCountry } from './index.js';
import type { CurrencyRecord } from './index.d.ts';

describe('@data-sets/currencies', () => {
  describe('data', () => {
    it('should export a non-empty array', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('should have valid records', () => {
      for (const record of data) {
        expect(record).toSatisfy(
          (r) =>
            typeof r.code === 'string' &&
            r.code.length === 3 &&
            typeof r.numericCode === 'string' &&
            r.numericCode.length === 3 &&
            typeof r.name === 'string' &&
            typeof r.symbol === 'string' &&
            typeof r.decimalPlaces === 'number' &&
            r.decimalPlaces >= 0 &&
            r.decimalPlaces <= 3 &&
            Array.isArray(r.countries) &&
            r.countries.length >= 1,
        );
      }
    });

    it('should be sorted by code', () => {
      for (let i = 1; i < data.length; i++) {
        expect(data[i].code > data[i - 1].code).toBe(true);
      }
    });
  });

  describe('findByCode', () => {
    it('should find by alpha code', () => {
      const usd = findByCode('USD');
      expect(usd).toBeDefined();
      expect(usd!.name).toBe('US Dollar');
      expect(usd!.symbol).toBe('$');
      expect(usd!.decimalPlaces).toBe(2);
    });

    it('should find by numeric code', () => {
      const gbp = findByCode('826');
      expect(gbp).toBeDefined();
      expect(gbp!.code).toBe('GBP');
      expect(gbp!.name).toBe('Pound Sterling');
    });

    it('should return undefined for unknown code', () => {
      expect(findByCode('ZZZ')).toBeUndefined();
    });
  });

  describe('findByName', () => {
    it('should find by exact name', () => {
      const euro = findByName('Euro');
      expect(euro).toBeDefined();
      expect(euro!.code).toBe('EUR');
    });

    it('should be case-insensitive', () => {
      const yen = findByName('YEN');
      expect(yen).toBeDefined();
      expect(yen!.code).toBe('JPY');
    });

    it('should return undefined for unknown name', () => {
      expect(findByName('Doubloon')).toBeUndefined();
    });
  });

  describe('findByCountry', () => {
    it('should return currencies for a valid country', () => {
      const result = findByCountry('United States');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.some((r) => r.code === 'USD')).toBe(true);
    });

    it('should be case-insensitive', () => {
      const result = findByCountry('japan');
      expect(result.length).toBe(1);
      expect(result[0].code).toBe('JPY');
    });

    it('should return empty array for unknown country', () => {
      const result = findByCountry('Atlantis');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('default export', () => {
    it('should have all named exports', () => {
      expect(currencies.data).toBe(data);
      expect(currencies.findByCode).toBe(findByCode);
      expect(currencies.findByName).toBe(findByName);
      expect(currencies.findByCountry).toBe(findByCountry);
    });
  });
});
