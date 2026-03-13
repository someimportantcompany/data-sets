import { describe, it, expect } from 'vitest';
import countries, { data, findByCode, findByName, findByContinent } from './index.js';
import type { CountryRecord } from './index.d.ts';

describe('@data-sets/countries', () => {
  describe('data', () => {
    it('should export a non-empty array', () => {
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
    });

    it('should have valid records', () => {
      for (const record of data) {
        expect(record).toSatisfy(
          (r) =>
            typeof r.name === 'string' &&
            typeof r.iso2 === 'string' &&
            r.iso2.length === 2 &&
            typeof r.iso3 === 'string' &&
            r.iso3.length === 3 &&
            typeof r.continent === 'string' &&
            typeof r.capitalCity === 'string' &&
            typeof r.phonePrefix === 'string' &&
            typeof r.currencyCode === 'string' &&
            typeof r.population === 'number',
        );
      }
    });
  });

  describe('findByCode', () => {
    it('should find by iso2', () => {
      const gb = findByCode('GB');
      expect(gb).toBeDefined();
      expect(gb!.name).toBe('United Kingdom');
      expect(gb!.iso3).toBe('GBR');
    });

    it('should find by iso3', () => {
      const usa = findByCode('USA');
      expect(usa).toBeDefined();
      expect(usa!.name).toBe('United States of America');
      expect(usa!.iso2).toBe('US');
    });

    it('should return undefined for unknown code', () => {
      expect(findByCode('ZZ')).toBeUndefined();
    });
  });

  describe('findByName', () => {
    it('should find by exact name', () => {
      const japan = findByName('Japan');
      expect(japan).toBeDefined();
      expect(japan!.iso2).toBe('JP');
    });

    it('should be case-insensitive', () => {
      const france = findByName('FRANCE');
      expect(france).toBeDefined();
      expect(france!.iso2).toBe('FR');
    });

    it('should return undefined for unknown name', () => {
      expect(findByName('Atlantis')).toBeUndefined();
    });
  });

  describe('findByContinent', () => {
    it('should return countries for a valid continent', () => {
      const european = findByContinent('Europe');
      expect(Array.isArray(european)).toBe(true);
      expect(european.length).toBeGreaterThan(0);
      for (const record of european) {
        expect(record.continent).toBe('Europe');
      }
    });

    it('should return empty array for unknown continent', () => {
      const result = findByContinent('Pangaea');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('default export', () => {
    it('should have all named exports', () => {
      expect(countries.data).toBe(data);
      expect(countries.findByCode).toBe(findByCode);
      expect(countries.findByName).toBe(findByName);
      expect(countries.findByContinent).toBe(findByContinent);
    });
  });
});
