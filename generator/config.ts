import matAddMeta from './meta/getMatMeta';
import twbsAddMeta from './meta/getTwbsMeta';
import icons8Meta from './meta/getIcons8Meta';
import lucideMeta from './meta/getLucideMeta';
import tablerMeta from './meta/getTablerMeta';
import bxMeta from './meta/getBxMeta';

export type SvgOptionalMeta = Partial<{
  name: string;
  aliases: string[];
  tags: string[];
  categories: string[];
  id: string;
  author: string;
  license: string;
}>;

export type SvgMeta = {
  className: string;
  file: string;
  path: string;
  hash: string;
};

export type IconConfig = {
  name: string;
  gitUrl: string;
  rawUrl: string;
  svgPath: string;
  repoFolderName: string;
  svgPrefix?: string[];
  addMeta: (meta: SvgMeta) => SvgOptionalMeta | undefined;
};

const config: Array<IconConfig> = [
  {
    name: 'Material Design',
    gitUrl: 'https://github.com/Templarian/MaterialDesign.git',
    rawUrl:
      'https://raw.githubusercontent.com/Templarian/MaterialDesign/master/',
    svgPath: 'svg',
    repoFolderName: 'mat',
    addMeta: matAddMeta,
  },
  {
    name: 'Bootstrap Icons',
    gitUrl: 'https://github.com/twbs/icons.git',
    rawUrl: 'https://raw.githubusercontent.com/twbs/icons/main/',
    svgPath: 'icons',
    repoFolderName: 'twbs',
    addMeta: twbsAddMeta,
  },
  {
    name: 'Ant Design Icons',
    gitUrl: 'https://github.com/ant-design/ant-design-icons.git',
    rawUrl: 'https://github.com/ant-design/ant-design-icons/blob/master/',
    svgPath: 'packages/icons-svg/svg',
    repoFolderName: 'ant',
    //no tags or author
    addMeta: () => undefined,
  },
  {
    name: 'Phosphor Icons',
    gitUrl: 'https://github.com/phosphor-icons/core.git',
    rawUrl: 'https://raw.githubusercontent.com/phosphor-icons/core/main',
    svgPath: 'raw',
    repoFolderName: 'phosphor',
    //check fin ...
    addMeta: () => undefined,
  },
  {
    name: 'Icons8 Line Awesome',
    gitUrl: 'https://github.com/icons8/line-awesome.git',
    rawUrl: 'https://raw.githubusercontent.com/icons8/master',
    svgPath: 'svg',
    repoFolderName: 'icons8',
    addMeta: icons8Meta,
  },
  {
    name: 'Lucide',
    gitUrl: 'https://github.com/lucide-icons/lucide.git',
    rawUrl: 'https://raw.githubusercontent.com/lucide-icons/lucide/main/',
    svgPath: 'icons',
    repoFolderName: 'lucide',
    addMeta: lucideMeta,
  },
  {
    name: 'Tabler Icons',
    gitUrl: 'https://github.com/tabler/tabler-icons.git',
    rawUrl: 'https://raw.githubusercontent.com/tabler/tabler-icons/main',
    svgPath: 'icons',
    repoFolderName: 'tabler',
    addMeta: tablerMeta,
  },
  {
    name: 'boxicons',
    gitUrl: 'https://github.com/atisawd/boxicons.git',
    rawUrl: 'https://raw.githubusercontent.com/atisawd/boxicons/master/',
    svgPath: 'svg',
    repoFolderName: 'bx',
    svgPrefix: ['bx-', 'bxl-', 'bxs-'],
    addMeta: bxMeta,
  },
];

export default config;
