import { RESPOSITORY_FOLDER } from '../setup';
import { readFileSync } from 'fs';
import { SvgMeta, SvgOptionalMeta } from '../config';
import { join } from 'path';

type Meta = {
  tags?: string[];
  category?: string;
  unicode: string;
  version: string;
};
const getMeta = (file: string): Meta | undefined => {
  const content = readFileSync(
    join(RESPOSITORY_FOLDER, 'tabler', file)
  ).toString();
  const match = content.match(/(--[\s\S]+?--)/);
  if (match) {
    const hit = match[0];
    const data: any = {};
    hit.split('\n').forEach((line) => {
      const trimedLine = line.trim();

      if (trimedLine === '--') {
        return;
      }
      const [key, value] = trimedLine.split(':');
      const trimedKey = key.trim();
      const trimedValue = value.trim();
      const isArray = trimedValue.startsWith('[') && trimedValue.endsWith(']');
      if (isArray) {
        data[trimedKey] = trimedValue
          .substring(1, trimedValue.length - 2)
          .split(',')
          .map((k) => k.trim());
      } else {
        data[trimedKey] = trimedValue;
      }
    });
    return data;
  }

  return undefined;
};
export default (file: SvgMeta): SvgOptionalMeta | undefined => {
  const fileName = file.path;
  const found = getMeta(fileName);
  if (!found) {
    return undefined;
  }
  const result: SvgOptionalMeta = {};
  if (!!found.tags) {
    result.tags = found.tags;
  }
  if (!!found.category) {
    result.categories = [found.category];
  }
  if (Object.keys(result).length > 0) {
    return result;
  }
  return undefined;
};
