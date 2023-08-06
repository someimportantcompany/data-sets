export function compareValues(rows: Record<string, string | string[]>[]) {
  const fields = Object.keys(rows[0]);
  const counts: Record<string, number> = {};
  const total = rows.length;

  const countValue = (row: Record<string, any>, key: string): boolean => Boolean(key in row && row[key] &&
    (Array.isArray(row[key]) || typeof row[key] === 'string') && row[key].length);
  const getResult = (count: number): string => {
    if (count === total) {
      return '✅';
    } else if (count === 0) {
      return '❌';
    } else {
      return '🟡';
    }
  };

  fields.forEach(field => counts[field] = rows.filter(r => countValue(r, field)).length);

  console.log((a => a.join('\n'))([
    '',
    '| Key | Found | Result',
    '| ---- | ---- | ---- |',
    ...(fields.map(field => `| ${field} | ${counts[field]} / ${total} | ${getResult(counts[field])} |`)),
    '',
  ]));
}
