import { describe, it, expect } from "vitest";

import countries, {
  data,
  findByCode,
  findByName,
  findByContinent,
} from "@data-sets/countries";

describe("@data-sets/countries", () => {
  it("data exports a non-empty array of valid records", () => {
    expect(data.length).toBeGreaterThan(0);
    const record = data[0];
    expect(record).toHaveProperty("name");
    expect(record).toHaveProperty("iso2");
    expect(record).toHaveProperty("iso3");
    expect(record).toHaveProperty("continent");
    expect(record).toHaveProperty("capitalCity");
    expect(record).toHaveProperty("phonePrefix");
    expect(record).toHaveProperty("currencyCode");
    expect(record).toHaveProperty("population");
  });

  it("findByCode returns a country for a valid iso2 or iso3 code", () => {
    const gb = findByCode("GB");
    expect(gb).toBeDefined();
    expect(gb!.name).toBe("United Kingdom");

    const usa = findByCode("USA");
    expect(usa).toBeDefined();
    expect(usa!.iso2).toBe("US");
  });

  it("findByName returns a country (case-insensitive)", () => {
    const japan = findByName("japan");
    expect(japan).toBeDefined();
    expect(japan!.iso2).toBe("JP");
  });

  it("findByContinent returns matching countries", () => {
    const european = findByContinent("Europe");
    expect(european.length).toBeGreaterThan(0);
    expect(european.every((c) => c.continent === "Europe")).toBe(true);
  });

  it("default export exposes all named exports", () => {
    expect(countries.data).toBe(data);
    expect(countries.findByCode).toBe(findByCode);
    expect(countries.findByName).toBe(findByName);
    expect(countries.findByContinent).toBe(findByContinent);
  });
});
