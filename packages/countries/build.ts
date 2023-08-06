/**
 * Build script for @data-sets/countries
 * @link https://download.geonames.org/export/dump/
 */
import assert from 'http-assert-plus';
import fs from 'fs';
import path from 'path';

import logger from '@/lib/logger';
import sparql, { parseProperty } from '@/lib/wikidata';
import { buildDataSetMaps, DataSetMaps } from '@/lib/templates';
import { compareValues } from '@/lib/utils';
import type { CountryRecord } from './index';

async function fetchData(): Promise<CountryRecord[]> {
  const rows = await sparql(`
    SELECT DISTINCT (?country AS ?qid)
      (SAMPLE(?countryLabel) AS ?name)
      (SAMPLE(?countryIso2) AS ?iso2)
      (SAMPLE(?countryIso3) AS ?iso3)
      (SAMPLE(?countryCallPrefix) AS ?phonePrefix)
      (SAMPLE(?currency) AS ?currencyQid)
      (SAMPLE(?currencyCodeLabel) AS ?currencyCode)
      (SAMPLE(?population) AS ?population)
      (SAMPLE(?location) AS ?latlon)
      (SAMPLE(?emergencyCallLabel) AS ?emergencyPhone)
      (SAMPLE(?countryGeonameLabel) AS ?geonameId)
      (GROUP_CONCAT(DISTINCT ?internetTldLabel; SEPARATOR=",") as ?internetTlds)
      (GROUP_CONCAT(DISTINCT ?timezoneLabel; SEPARATOR=",") as ?timezones)
      (GROUP_CONCAT(DISTINCT ?languageLabel; SEPARATOR=",") as ?languages)
      (SAMPLE(?continent) AS ?continentQid)
      (SAMPLE(?continentLabel) AS ?continentName)
      (SAMPLE(?capital) AS ?capitalQid)
      (SAMPLE(?capitalLabel) AS ?capitalName)
    WHERE {
      ?country wdt:P31 wd:Q3624078 .
      ?country wdt:P297 ?countryIso2 .
      ?country wdt:P298 ?countryIso3 .
      ?country wdt:P474 ?countryCallPrefix .
      ?country wdt:P1082 ?population .
      ?country wdt:P625 ?location .
      ?country wdt:P2852 ?emergencyCall .
      ?country wdt:P1566 ?countryGeoname .
      ?country wdt:P78 ?internetTld .

      ?country wdt:P38 ?currency .
      ?country wdt:P421 ?timezone .
      ?country wdt:P37 ?language .
      ?country wdt:P30 ?continent .
      ?country wdt:P36 ?capital .

      ?currency wdt:P498 ?currencyCode .

      #not a former country
      FILTER NOT EXISTS {?country wdt:P31 wd:Q3024240}
      #and no an ancient civilisation (needed to exclude ancient Egypt)
      FILTER NOT EXISTS {?country wdt:P31 wd:Q28171280}

      SERVICE wikibase:label {
        bd:serviceParam wikibase:language "en" .
        ?country rdfs:label ?countryLabel .
        ?currencyCode rdfs:label ?currencyCodeLabel .
        ?emergencyCall rdfs:label ?emergencyCallLabel .
        ?countryGeoname rdfs:label ?countryGeonameLabel .
        ?internetTld rdfs:label ?internetTldLabel .
        ?timezone rdfs:label ?timezoneLabel .
        ?capital rdfs:label ?capitalLabel .
        ?continent rdfs:label ?continentLabel .
        ?language rdfs:label ?languageLabel .
      }
    }
    GROUP BY ?country
    ORDER BY ?iso2
  `);

  // logger.info({ rows });

  assert(Array.isArray(rows.results?.bindings), 'Expected SPARQL to return an array of results');

  return rows.results!.bindings!.map((row: any) => ({
    id: parseProperty(row, 'qid.value', 'QID')!,
    name: parseProperty(row, 'name.value')!,
    iso2: parseProperty(row, 'iso2.value')!,
    iso3: parseProperty(row, 'iso3.value'),
    phonePrefix: parseProperty(row, 'phonePrefix.value'),
    currencyId: parseProperty(row, 'currencyQid.value', 'QID'),
    currencyCode: parseProperty(row, 'currencyCode.value'),
    population: parseProperty(row, 'population.value'),
    latlon: parseProperty(row, 'latlon.value', 'LATLON'),
    emergencyPhone: parseProperty(row, 'emergencyPhone.value'),
    geonameId: parseProperty(row, 'geonameId.value'),
    internetTlds: parseProperty(row, 'internetTlds.value', 'GROUP_CONCAT(STRING)'),
    // timezones: (parseProperty(row, 'timezones.value', 'GROUP_CONCAT(STRING)') ?? [])
    //   .filter(tz => tz.includes('/')),
    // languages: parseProperty(row, 'languages.value', 'GROUP_CONCAT(STRING)'),
    continent: parseProperty(row, 'continentName.value'),
    capitalCity: parseProperty(row, 'capitalName.value'),
  }));
}

function pushToIndex(
  index: Record<string, Record<string, any>> | undefined,
  key: string,
  value: Record<string, any>
): Record<string, Record<string, any>>;
function pushToIndex(
  index: Record<string, string | Record<string, any>> | undefined,
  key: string | undefined,
  value: string
): Record<string, string | Record<string, any>>;
function pushToIndex(
  index: Record<string, string | Record<string, any>> | undefined,
  key: string | undefined,
  value: Record<string, any> | string
): Record<string, string | Record<string, any>> | undefined {
  if (typeof key === 'string') {
    assert(index === undefined || !index[key], new Error(`Duplicate entry: ${key}`));
    return Object.assign(index ?? {}, { [key]: value });
  } else {
    return index;
  }
}

(async () => {
  /* eslint-disable no-process-exit */
  try {
    const rows = await fetchData();
    compareValues(rows);

    logger.info({
      length: rows.length,
      countryCodes: rows.map(({ iso2 }) => iso2),
      sample: rows.filter(({ iso2 }) => ['US', 'GB'].includes(iso2)),
    }, 'Loaded country info');

    const data = rows.reduce((maps: DataSetMaps, record) => {
      maps.primaryIndex = pushToIndex(maps.primaryIndex, record.id, record);
      maps.indexByIso2 = pushToIndex(maps.indexByIso2, record.iso2, record.id);
      return maps;
    }, {
      primaryIndex: {},
    });
    fs.writeFileSync(path.resolve(__dirname, './data.cjs'), buildDataSetMaps(data, {
      generatedBy: 'packages/countries/build.ts',
    }));
    fs.writeFileSync(path.resolve(__dirname, './data.json'), JSON.stringify(rows, null, 2));

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
