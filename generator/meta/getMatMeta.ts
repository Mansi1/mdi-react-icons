import { readFileSync } from 'fs';
import { RESPOSITORY_FOLDER } from '../setup';
import { SvgMeta, SvgOptionalMeta } from '../config';
import { join } from 'path';
type Meta = {
  name: string;
  id: string;
  codepoint;
  aliases: string[];
  version: string;
  tags: string[];
  author: string;
};
let META: Record<string, Meta>;

const getMetaMap = (): Record<string, Meta> => {
  if (!!META) {
    return META;
  }
  META = JSON.parse(
    readFileSync(join(RESPOSITORY_FOLDER, 'mat', 'meta.json')).toString()
  ).reduce((prev, curr) => {
    prev[curr.name] = curr;
    return prev;
  }, {});
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
    aliases: found.aliases,
    tags: found.tags,
    author: found.author,
    id: found.id,
    name: found.name,
  };
};
