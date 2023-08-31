import fs from 'fs';
import assert from 'http-assert-plus';
import * as csv from 'csv-parse';

import logger from './logger';

export function parseCSV(input: fs.ReadStream, { columns, filter, fromLine }: {
  columns: boolean | string[],
  filter: (record: Record<string, any>) => boolean,
  fromLine?: number,
}): Promise<Record<string, any>[]> {
  assert(typeof filter === 'function', new TypeError('Expected filter to be a function'));

  return new Promise((resolve, reject) => {
    const parser = csv.parse({
      columns,
      ...(typeof fromLine === 'number' && { from_line: fromLine }),
      delimiter: '\t',
      escape: false,
      relax_column_count: true,
      // skip_lines_with_error: true,
      quote: false,
    });

    const results: Record<string, any>[] = [];

    parser.on('readable', () => {
      let record;
      while ((record = parser.read()) !== null) {
        if (record && filter(record)) {
          results.push(record);
        }
      }
    });

    input.on('error', err => reject(err));
    parser.on('error', err => reject(err));
    parser.on('skip', err => logger.warn(err));
    parser.on('end', () => resolve(results));

    input.pipe(parser);
  });
}
