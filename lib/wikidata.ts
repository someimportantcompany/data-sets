import _get from 'lodash/get';
import _pick from 'lodash/pick';
import assert from 'http-assert-plus';
import axios from 'axios';

import logger from './logger';

export default async function sparql(query: string): Promise<Record<string, any>> {
  const reqFields = [ 'method', 'url', 'headers', 'params', 'data' ];
  const resFields = [ 'status', 'headers', 'data' ];
  const noData = (key: string) => key !== 'data';
  try {
    const res = await axios.post('https://query.wikidata.org/sparql', query.trim(), {
      headers: {
        accept: 'application/sparql-results+json',
        'content-type': 'application/sparql-query',
      },
      validateStatus: () => true,
    });

    logger.info({ req: _pick(res.config, reqFields.filter(noData)), res: _pick(res, resFields.filter(noData)) });
    return res.data;
  } catch (err: any) {
    if (err.response?.status) {
      logger.error({ err, req: _pick(err.config, reqFields), res: _pick(err.response, resFields) });
      const { status, headers, data } = err;
      throw assert.fail(status, 'An error occurred', { res: { status, headers, data } });
    } else {
      logger.error({ err, req: _pick(err.config, reqFields) });
      throw err;
    }
  }
}

export function compareValues(rows: Awaited<ReturnType<typeof sparql>>) {
  const fields = _get(rows, 'head.vars') as string[];
  const results = _get(rows, 'results.bindings') as Record<string, any>[];

  const counts: Record<string, number> = {};
  const total = results.length;

  const hasOwnProperty = (o: Record<string, any>, k: string) => Object.prototype.hasOwnProperty.call(o, k);
  const countValue = (row: Record<string, any>, key: string) => hasOwnProperty(row, key)
    && hasOwnProperty(row[key], 'value');

  fields.forEach(field => counts[field] = results.filter(r => countValue(r, field)).length);

  console.log((a => a.join('\n'))([
    '',
    '| Key | Found |',
    '| ---- | ---- |',
    ...(fields.map(field => `| ${field} | ${counts[field]} / ${total} |`)),
    '',
  ]));
}

/* eslint-disable no-redeclare, no-unused-vars */
export function parseProperty(row: any, key: string): string | undefined;
export function parseProperty(row: any, key: string, format?: 'QID'): string | undefined;
export function parseProperty(row: any, key: string, format?: 'GROUP_CONCAT(STRING)'): string[] | undefined;
export function parseProperty(row: any, key: string, format?: 'LATLON'): [string, string] | undefined;
/* eslint-enable no-redeclare, no-unused-vars */
export function parseProperty( // eslint-disable-line no-redeclare
  row: any,
  key: string,
  format?: 'QID' | 'GROUP_CONCAT(STRING)' | 'LATLON',
): string[] | string | [string, string] | undefined {
  const value: string | undefined = _get(row, key);

  if (typeof value === 'string' && format) {
    let formatted: string[] | string | [number, number] | undefined;
    try {
      switch (format) {
        case 'QID': {
          assert(value.startsWith('http://') || value.startsWith('https://'), 'Expected argument to be a URL');
          assert(value.includes('/Q'), 'Expected argument to be a Wikidata QID');
          formatted = value.substring(value.indexOf('/Q') + 1);
          break;
        }

        case 'GROUP_CONCAT(STRING)': {
          formatted = value.split(',').filter(s => s.length > 0);
          break;
        }

        case 'LATLON': {
          assert(value.startsWith('Point(') && value.endsWith(')') && value.includes(' '),
            'Expected argument to be a GPS point');
          const [ lat, lon ] = value.substring('POINT('.length, value.length - 1).split(' ');
          assert(lat && lon, 'Expected lat/lon to be set');
          formatted = [ lat, lon ];
          break;
        }

        default: {
          formatted = value;
        }
      }

      return formatted;
    } catch (err) {
      // eslint-disable-next-line no-unused-expressions
      (process.env.NODE_ENV !== 'testing') && console.error(key, value, err);
      return undefined;
    }
  } else {
    return value;
  }
}
