import { readFileSync, readdirSync } from 'fs';
import { RESPOSITORY_FOLDER } from '../setup';
import { join } from 'path';
import { SvgMeta, SvgOptionalMeta } from '../config';

type Meta = {
  title: string;
  added?: string;
  tags: string[];
  categories: string[];
};
let META: Record<string, Meta>;

const getMetaMap = (): Record<string, Meta> => {
  if (!!META) {
    return META;
  }
  META = {};
  const mdDirectory = join(
    RESPOSITORY_FOLDER,
    'twbs',
    'docs',
    'content',
    'icons'
  );
  const markdownFiles = readdirSync(mdDirectory).filter((v) =>
    v.endsWith('.md')
  );

  for (const f of markdownFiles) {
    const markdownFile = join(mdDirectory, f);

    const fileContent = readFileSync(markdownFile).toString();

    const fileLines = fileContent.split('\n');
    const obj: any = {};
    let list;
    for (const fileLine of fileLines) {
      const trimedLine = fileLine.trim();
      if (trimedLine === '---') {
        continue;
      } else if (trimedLine.indexOf(':') > -1) {
        const [name, value] = trimedLine.split(':');
        if (!!value.trim()) {
          //found value
          obj[name] = value.trim();
          list = undefined;
        } else {
          list = name;
        }
      } else if (trimedLine.startsWith('-')) {
        //is list
        const [, item] = trimedLine.split('-');
        obj[list] = obj[list] || [];
        obj[list].push(item.trim());
      }
    }
    META[f.split('.md')[0]] = obj;
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
    tags: found.tags,
    name: found.title,
    categories: found.categories,
  };
};
