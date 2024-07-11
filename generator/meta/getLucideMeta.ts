import { readFileSync, readdirSync } from 'fs';
import { RESPOSITORY_FOLDER } from '../setup';
import { SvgMeta, SvgOptionalMeta } from '../config';
import { join } from 'path';

type Meta = {
  name: string;
  contributors: string[];
  categories: string[];
  tags: string[];
};

let META: Record<string, Meta>;

const getMetaMap = (): Record<string, Meta> => {
  if (!!META) {
    return META;
  }
  META = {};
  const mdDirectory = join(RESPOSITORY_FOLDER, 'lucide', 'icons');
  const jsonFiles = readdirSync(mdDirectory).filter((v) => v.endsWith('.json'));

  for (const jsonFile of jsonFiles) {
    const name = jsonFile.split('.json')[0];
    const pathJsonFile = join(mdDirectory, jsonFile);
    META[name] = JSON.parse(readFileSync(pathJsonFile).toString());
  }
  return META;
};
export default (file: SvgMeta): SvgOptionalMeta | undefined => {
  const metaMap = getMetaMap();
  const name = file.file.split('.svg')[0];
  const found = metaMap[name];
  if (!found) {
    return undefined;
  }
  return {
    author: found.contributors.join(', '),
    categories: found.categories,
    tags: found.tags,
    name: found.name,
  };
};
