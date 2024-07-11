import { SvgMeta, SvgOptionalMeta } from '../config';
import tags from './icon8Tags.json';

const META = Object.entries(tags).reduce((prev, curr) => {
  const [tag, values] = curr;
  for (const value of values) {
    prev[value] = prev[value] || [];
    if (prev[value].indexOf(tag) === -1) {
      prev[value].push(tag);
    }
  }
  return prev;
}, {});

export default (file: SvgMeta): SvgOptionalMeta | undefined => {
  const name = file.file.split('.svg')[0];
  const found = META[name];

  if (!found) {
    return undefined;
  }
  return {
    tags: found,
  };
};
