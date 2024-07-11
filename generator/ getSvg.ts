import { readFileSync } from 'fs';
import { INode, parse as svgParse, stringify as svgStringify } from 'svgson';

const updateSvgNode = (node: INode) => {
  delete node.attributes.class;
  delete node.attributes.id;

  if (node.name === 'svg') {
    delete node.attributes.t;
    delete node.attributes.width;
    delete node.attributes.height;
  }

  Object.entries(node.attributes).forEach(([key, value]) => {
    if (key.includes(':')) {
      delete node.attributes[key];
      const newKey = key
        .split(':')
        .filter((v) => !!v)
        .reduce((prev, curr, index) => {
          if (index === 0) {
            return curr;
          }
          return prev + curr.substring(0, 1).toUpperCase() + curr.substring(1);
        }, '');
      node.attributes[newKey] = value;
    }
  });
  node.children.forEach((c) => updateSvgNode(c));
};

export const getSvg = async (filePath: string): Promise<string> => {
  const rawSvg = readFileSync(filePath).toString();

  const parsedSvg = await svgParse(rawSvg);

  updateSvgNode(parsedSvg);

  return await svgStringify(parsedSvg);
};
