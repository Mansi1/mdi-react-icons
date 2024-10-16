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

export type Package = { name: string; version: string };

export type IconConfig = {
  packageV4: Package;
  packageV5: Package;
  name: string;
  gitUrl: string;
  rawUrl: string;
  svgPath: string;
  repoFolderName: string;
  svgPrefix?: string[];
  addMeta: (meta: SvgMeta) => SvgOptionalMeta | undefined;
};

export const DEFAULT_KEYWORDS_V5 = [
  '@mui-extra',
  '@mui-extra/icons',
  'material ui v5',
  'icons',
  'mui/icons',
  'mdi icons',
  'icons',
  'SvgIcons',
  'Material-UI icons',
  'SVG',
  'Material Design Icons',
  'React icons',
  'UI icons',
  'icon library',
  'custom icons',
  'icon assets',
  'icon set',
  'icon customization',
  'icon integration',
  'open source icons',
  'icon management',
  'icon resources',
];

export const DEFAULT_KEYWORDS_V4 = [
  '@material-ui-extra',
  'material ui v4',
  '@material-ui-extra/icons',
  'material-ui/icons',
  'mdi icons',
  'icons',
  'SvgIcons',
  'Material-UI icons',
  'SVG',
  'React icons',
  'UI icons',
  'icon library',
  'custom icons',
  'icon assets',
  'icon set',
  'icon customization',
  'icon integration',
  'open source icons',
  'icon management',
  'icon resources',
];
const config: Array<IconConfig> = [
  {
    name: 'Material Design Icons',
    packageV4: {
      name: '@material-ui-extra/icons',
      version: '1.1.4',
    },
    packageV5: {
      name: '@mui-extra/icons',
      version: '1.0.1',
    },
    gitUrl: 'https://github.com/Templarian/MaterialDesign.git',
    rawUrl:
      'https://raw.githubusercontent.com/Templarian/MaterialDesign/master/',
    svgPath: 'svg',
    repoFolderName: 'mat',
    addMeta: matAddMeta,
  } /*
  {
    name: 'Bootstrap Icons',
    packageV4: {
      name: '@material-ui-extra/icons-twbs',
      version: '0.0.1',
    },
    packageV5: {
      name: '@mui-extra/icons-twbs',
      version: '0.0.1',
    },
    gitUrl: 'https://github.com/twbs/icons.git',
    rawUrl: 'https://raw.githubusercontent.com/twbs/icons/main/',
    svgPath: 'icons',
    repoFolderName: 'twbs',
    addMeta: twbsAddMeta,
  },
  {
    name: 'Ant Design Icons',
    packageV4: {
      name: '@material-ui-extra/icons-ant',
      version: '0.0.1',
    },
    packageV5: {
      name: '@mui-extra/icons-ant',
      version: '0.0.1',
    },
    gitUrl: 'https://github.com/ant-design/ant-design-icons.git',
    rawUrl: 'https://github.com/ant-design/ant-design-icons/blob/master/',
    svgPath: 'packages/icons-svg/svg',
    repoFolderName: 'ant',
    //no tags or author
    addMeta: () => undefined,
  },
  {
    name: 'Phosphor Icons',
    packageV4: {
      name: '@material-ui-extra/icons-phosphor',
      version: '0.0.1',
    },
    packageV5: {
      name: '@mui-extra/icons-phosphor',
      version: '0.0.1',
    },
    gitUrl: 'https://github.com/phosphor-icons/core.git',
    rawUrl: 'https://raw.githubusercontent.com/phosphor-icons/core/main',
    svgPath: 'raw',
    repoFolderName: 'phosphor',
    //check fin ...
    addMeta: () => undefined,
  },
  {
    name: 'Icons8 Line Awesome',
    packageV4: {
      name: '@material-ui-extra/icons-icons8',
      version: '0.0.1',
    },
    packageV5: {
      name: '@mui-extra/icons-icons8',
      version: '0.0.1',
    },
    gitUrl: 'https://github.com/icons8/line-awesome.git',
    rawUrl: 'https://raw.githubusercontent.com/icons8/master',
    svgPath: 'svg',
    repoFolderName: 'icons8',
    addMeta: icons8Meta,
  },
  {
    name: 'Lucide',
    packageV4: {
      name: '@material-ui-extra/icons-lucide',
      version: '0.0.1',
    },
    packageV5: {
      name: '@mui-extra/icons-lucide',
      version: '0.0.1',
    },
    gitUrl: 'https://github.com/lucide-icons/lucide.git',
    rawUrl: 'https://raw.githubusercontent.com/lucide-icons/lucide/main/',
    svgPath: 'icons',
    repoFolderName: 'lucide',
    addMeta: lucideMeta,
  },
  {
    name: 'Tabler Icons',
    packageV4: {
      name: '@material-ui-extra/icons-tabler',
      version: '0.0.1',
    },
    packageV5: {
      name: '@mui-extra/icons-tabler',
      version: '0.0.1',
    },
    gitUrl: 'https://github.com/tabler/tabler-icons.git',
    rawUrl: 'https://raw.githubusercontent.com/tabler/tabler-icons/main',
    svgPath: 'icons',
    repoFolderName: 'tabler',
    addMeta: tablerMeta,
  },*/,
  {
    name: 'boxicons',
    packageV4: {
      name: '@material-ui-extra/icons-bx',
      version: '0.0.1',
    },
    packageV5: {
      name: '@mui-extra/icons-bx',
      version: '0.0.1',
    },
    gitUrl: 'https://github.com/atisawd/boxicons.git',
    rawUrl: 'https://raw.githubusercontent.com/atisawd/boxicons/master/',
    svgPath: 'svg',
    repoFolderName: 'bx',
    svgPrefix: ['bx-', 'bxl-', 'bxs-'],
    addMeta: bxMeta,
  },
];

export default config;
