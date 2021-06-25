/**
 * Build script for ./countries.json
 * @link https://download.geonames.org/export/dump/
 *
 * Requires:
 * - allCountries.txt https://download.geonames.org/export/dump/allCountries.zip
 * - countryInfo.txt https://download.geonames.org/export/dump/countryInfo.txt
 */
const csv = require('csv-parse');
const fs = require('fs');

function assert(value, err) {
  if (Boolean(value) === false) {
    throw err;
  }
}

function parseCSV({ filename, columns = true, filter, fromLine }) {
  assert(typeof filename === 'string', new TypeError('Expected filename to be a string'));
  assert(typeof filter === 'function', new TypeError('Expected filter to be a function'));

  return new Promise((resolve, reject) => {
    const file = fs.createReadStream(filename);
    file.on('error', err => reject(err));

    const parser = csv({
      columns,
      delimiter: '\t',
      escape: false,
      from_line: fromLine,
      relax_column_count: true,
      // skip_lines_with_error: true,
      quote: false,
    });

    const results = [];

    parser.on('readable', () => {
      let record = null;
      // eslint-disable-next-line no-cond-assign
      while (record = parser.read()) {
        if (record && filter(record)) {
          results.push(record);
        }
      }
    });

    parser.on('error', err => reject(err));
    // eslint-disable-next-line no-console
    parser.on('skip', err => console.error(err));
    parser.on('end', () => resolve(results));

    file.pipe(parser);
  });
}

function mapData(record, geoplace) {
  assert(record && record.geonameid, new TypeError('Missing country data'));
  assert(geoplace && geoplace.geonameid, new TypeError('Missing country data'));

  const entry = {
    name: record.Country,
    code: record.ISO,
    iso3: record.ISO3,
    latlon: null,
    continent: record.Continent || null,
    capital: record.Capital || null,
    currency: null,
    languages: null,
    neighbours: null,
    population: parseInt(record.Population, 10),
    timezone: null,
    code_alt: undefined,
    name_alt: undefined,
  };

  if (record.CurrencyCode && record.CurrencyName) {
    entry.currency = {
      code: record.CurrencyCode,
      name: record.CurrencyName,
    };
  }
  if (record.Languages) {
    entry.languages = record.Languages.split(',').map(s => s.trim().toUpperCase());
  }
  if (record.neighbours) {
    entry.neighbours = record.neighbours.split(',').map(s => s.trim().toUpperCase());
  }

  if (geoplace && geoplace.geonameid) {
    if (entry.name !== geoplace.name) {
      entry.name_alt = geoplace.name;
    }
    if (geoplace.latitude && geoplace.longitude) {
      entry.latlon = `${geoplace.latitude},${geoplace.longitude}`;
    }
    if (typeof geoplace.timezone === 'string' && geoplace.timezone.includes('/')) {
      entry.timezone = geoplace.timezone;
    }
  }

  if (FIXES[entry.code]) {
    Object.assign(entry, FIXES[entry.code]);
  }

  return entry;
}

const FIXES = {
  // AU: {
  //   timezone: 'Australia/Sydney',
  // },
  // BR: {
  //   timezone: 'America/Sao_Paulo',
  // },
  GB: { name_alt: 'Great Britain', code_alt: 'UK' },
  US: { code_alt: 'USA' },
};

(async () => {
  /* eslint-disable no-console, no-process-exit */
  const IS_PRODUCTION = process.env.NODE_ENV === 'production';
  try {
    const countries = await parseCSV({
      filename: './countryInfo.txt',
      columns: [
        'ISO', 'ISO3', 'ISO-Numeric', 'fips', 'Country', 'Capital', 'Area(in sq km)', 'Population', 'Continent', 'tld',
        'CurrencyCode', 'CurrencyName', 'Phone', 'Postal Code Format', 'Postal Code Regex', 'Languages', 'geonameid',
        'neighbours', 'EquivalentFipsCode',
      ],
      fromLine: 51,
      filter: record => record && record.geonameid,
    });

    if (!IS_PRODUCTION) {
      console.log(countries.length, countries.map(({ ISO }) => ISO));
      // fs.writeFileSync('./output-1.json', JSON.stringify(countries, null, 2), 'utf8');
    }

    const validIDs = countries.map(({ geonameid }) => `${geonameid}`);

    const geoData = await parseCSV({
      filename: './allCountries.txt',
      columns: [
        'geonameid', 'name', 'asciiname', 'alternatenames', 'latitude', 'longitude', 'feature class', 'feature code',
        'country code', 'cc2', 'admin1 code', 'admin2 code', 'admin3 code', 'admin4 code', 'population', 'elevation',
        'dem', 'timezone', 'modification date',
      ],
      filter: record => record && record.geonameid && validIDs.includes(record.geonameid),
    });

    if (!IS_PRODUCTION) {
      console.log(geoData.length);
      // fs.writeFileSync('./output-2.json', JSON.stringify(geoData, null, 2), 'utf8');
    }

    const data = countries.map(record => {
      const geoplace = geoData.find(({ geonameid }) => geonameid === record.geonameid);
      return mapData(record, geoplace);
    });

    fs.writeFileSync('./countries.json', IS_PRODUCTION ? JSON.stringify(data) : JSON.stringify(data, null, 2), 'utf8');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
