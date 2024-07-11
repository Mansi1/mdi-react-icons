import { SvgMeta, SvgOptionalMeta } from '../config';
import META from './bx.json';

export default (file: SvgMeta): SvgOptionalMeta | undefined => {
  const name = file.file.split('.svg')[0];
  const found = META[name];
  if (!found) {
    return undefined;
  }
  const result: SvgOptionalMeta = {};
  if (!!found.term && found.term.length > 0) {
    result.tags = found.term;
  }
  if (!!found.category) {
    result.categories = [found.category];
  }
  if (Object.keys(result).length > 0) {
    return result;
  }
  return undefined;
};
