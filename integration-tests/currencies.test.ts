import { describe, it, expect } from 'vitest';
import currencies, { data, findByCode, findByName, findByCountry } from '@data-sets/currencies';

describe('@data-sets/currencies', () => {
  it('data exports a non-empty array of valid records', () => {
    expect(data.length).toBeGreaterThan(0);
    const record = data[0];
    expect(record).toHaveProperty('code');
    expect(record).toHaveProperty('numericCode');
    expect(record).toHaveProperty('name');
    expect(record).toHaveProperty('symbol');
    expect(record).toHaveProperty('decimalPlaces');
    expect(record).toHaveProperty('countries');
  });

  it('findByCode returns a currency for a valid alpha or numeric code', () => {
    const usd = findByCode('USD');
    expect(usd).toBeDefined();
    expect(usd!.name).toBe('US Dollar');

    const gbp = findByCode('826');
    expect(gbp).toBeDefined();
    expect(gbp!.code).toBe('GBP');
  });

  it('findByName returns a currency (case-insensitive)', () => {
    const euro = findByName('euro');
    expect(euro).toBeDefined();
    expect(euro!.code).toBe('EUR');
  });

  it('findByCountry returns matching currencies', () => {
    const result = findByCountry('Japan');
    expect(result.length).toBe(1);
    expect(result[0].code).toBe('JPY');
  });

  it('default export exposes all named exports', () => {
    expect(currencies.data).toBe(data);
    expect(currencies.findByCode).toBe(findByCode);
    expect(currencies.findByName).toBe(findByName);
    expect(currencies.findByCountry).toBe(findByCountry);
  });
});
