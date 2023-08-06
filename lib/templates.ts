import * as eta from 'eta';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const templates = yaml.load(fs.readFileSync(path.resolve(__dirname, './templates.yml')
  , 'utf8')) as Record<string, string>;

const etaConfig: Partial<eta.EtaConfig> = { autoEscape: false, autoTrim: false };

export interface DataSetMaps {
  primaryIndex: Record<string, Record<string, any>>,
  [key: string]: Record<string, string | Record<string, string>>,
};

export function buildDataSetMaps(data: DataSetMaps, {
  generatedBy,
}: {
  generatedBy: string,
}): string {
  return eta.render(templates['map.cjs'], { data, generatedBy }, etaConfig).trim();
}

export function buildEnumsTemplate(data: Record<string, string[]>, {
  generatedBy,
}: {
  generatedBy: string,
}): string {
  return eta.render(templates['enums.d.ts'], { data, generatedBy }, etaConfig).trim();
}
