//clone repos
import simpleGit from 'simple-git';
import { sync as hashSync } from 'hash-file';
import { compile } from 'handlebars';
import * as crypto from 'crypto';

import { join, relative } from 'path';

import ICON_CONFIG from './config';

import {
  readdirSync,
  statSync,
  writeFileSync,
  mkdirSync,
  readFileSync,
  rmdirSync,
} from 'fs';
import { compileIcons } from './compile';
import { getSvg } from './ getSvg';
import { IconConfig, SvgMeta } from './config';
const git = simpleGit();

export const RESPOSITORY_FOLDER = join(__dirname, '..', 'icons', 'repository');
export const DIST_FOLDER = join(__dirname, '..', 'icons', 'dist');
export const SOURCE_FOLDER = join(__dirname, '..', 'icons', 'src');

const cloneGitRepo = async (gitUrl: string, desinationPath: string) => {
  try {
    console.log('- start cloning');
    console.log('- git url: ' + gitUrl);
    console.log('- path ' + desinationPath);
    await git.clone(gitUrl, desinationPath, ['--depth', '1']);
  } catch (err) {
    console.error('- error cloning!');
  }
};

export const createIconName = (rawName: string) => {
  let prefix = '';
  if (rawName.match(/^\d/)) {
    prefix = '_';
  }
  return `${prefix}${rawName
    .split('-')
    .map((v: string) => v.substring(0, 1).toUpperCase() + v.substring(1))
    .join('')}Icon`;
};

const getFolderMetadata = (config: IconConfig) => {
  const fn = async (
    projectPath: string,
    folderPath: string,
    deep: number = 0
  ): Promise<Array<SvgMeta>> => {
    const result: Array<SvgMeta> = [];
    const contents = readdirSync(folderPath);
    for (const content of contents) {
      const itemPath = join(folderPath, content);
      const stats = statSync(itemPath);

      if (stats.isDirectory()) {
        result.push(...(await fn(projectPath, itemPath, deep + 1)));
      } else {
        if (content.toLowerCase().endsWith('.svg')) {
          try {
            const parts = itemPath
              .substring(projectPath.length)
              .split('/')
              .filter((v) => !!v);
            const fileNameParts = [parts.pop()!.split('.svg')[0]];
            for (let i = 0; i < deep; i++) {
              const partName = parts.pop()!;
              if (!fileNameParts[fileNameParts.length - 1].endsWith(partName)) {
                fileNameParts.push(partName);
              }
            }
            let fileName = fileNameParts.join('-');

            if (config.svgPrefix) {
              const svgPrefix = config.svgPrefix.find((p) =>
                fileName.startsWith(p)
              );
              if (!!svgPrefix) {
                fileName = fileName.substring(svgPrefix.length);
              }
            }
            const meta = {
              className: createIconName(fileName),
              file: fileName + '.svg',
              path: relative(projectPath, itemPath),
              hash: hashSync(itemPath),
            };

            result.push(meta);
          } catch (err) {
            console.error(err);
            console.error(itemPath);
          }
        }
      }
    }
    return result;
  };
  return fn;
};
interface IconMustacheViewData {
  iconClassName: string;
  svg: string;
  url: string;
}
let renderIcon4Template;
export const renderIconV4 = (viewData: IconMustacheViewData) => {
  if (!renderIcon4Template) {
    const templatePath = join(__dirname, 'icon-v4.mustache');
    const templateString = readFileSync(templatePath).toString('utf8');

    renderIcon4Template = compile(templateString);
  }
  return renderIcon4Template(viewData);
};

let renderIcon5Template;
export const renderIconV5 = (viewData: IconMustacheViewData) => {
  if (!renderIcon5Template) {
    const templatePath = join(__dirname, 'icon-v5.mustache');
    const templateString = readFileSync(templatePath).toString('utf8');
    renderIcon5Template = compile(templateString);
  }
  return renderIcon5Template(viewData);
};
let renderIconAliasTemplate;

export const renderAliasIcon = (
  viewData: IconMustacheViewData & {
    iconAliasClassName: string;
    originalIconName: string;
  }
) => {
  if (!renderIconAliasTemplate) {
    const templatePath = join(__dirname, 'icon-alias-template.mustache');
    const templateString = readFileSync(templatePath).toString('utf8');
    renderIconAliasTemplate = compile(templateString);
  }
  return renderIconAliasTemplate(viewData);
};

const setup = async () => {
  rmdirSync(SOURCE_FOLDER, { recursive: true });
  rmdirSync(DIST_FOLDER, { recursive: true });

  mkdirSync(SOURCE_FOLDER, { recursive: true });

  for (const config of ICON_CONFIG) {
    const iconRegistry = new Set<string>();
    const icons: any[] = [];
    console.log(`${config.name}`);
    const outputPath = join(RESPOSITORY_FOLDER, config.repoFolderName);
    mkdirSync(outputPath, { recursive: true });
    console.log(`- create lib folder ${outputPath}`);
    await cloneGitRepo(config.gitUrl, outputPath);

    const iconMetas = await getFolderMetadata(config)(
      outputPath,
      join(outputPath, config.svgPath)
    );

    const projectFolderV4 = join(SOURCE_FOLDER, `v4`, config.repoFolderName);
    const projectFolderV5 = join(SOURCE_FOLDER, `v5`, config.repoFolderName);

    const assetFolderV4 = join(projectFolderV4, 'assets');
    const assetFolderV5 = join(projectFolderV5, 'assets');

    const assetIconsV4 = join(projectFolderV4, 'icons');
    const assetIconsV5 = join(projectFolderV5, 'icons');

    mkdirSync(assetFolderV4, { recursive: true });
    mkdirSync(assetFolderV5, { recursive: true });

    mkdirSync(assetIconsV4, { recursive: true });
    mkdirSync(assetIconsV5, { recursive: true });

    for (const iconMeta of iconMetas) {
      const iconInfo: any = {};

      const optionalMeta = config.addMeta(iconMeta);

      const svgFilePath = join(
        RESPOSITORY_FOLDER,
        config.repoFolderName,
        iconMeta.path
      );

      const svgAsString = await getSvg(svgFilePath);

      writeFileSync(join(assetFolderV4, iconMeta.file), svgAsString);
      writeFileSync(join(assetFolderV5, iconMeta.file), svgAsString);

      const rawIconUrl = join(config.rawUrl, config.svgPath, iconMeta.file);
      const renderMeta = {
        iconClassName: iconMeta.className,
        svg: svgAsString,
        url: rawIconUrl,
        ...optionalMeta,
      };

      iconRegistry.add(iconMeta.className.toLowerCase());
      iconInfo.name = iconMeta.file.split('.svg')[0];
      iconInfo.className = iconMeta.className;
      writeFileSync(
        join(assetIconsV4, iconMeta.className + '.tsx'),
        renderIconV4(renderMeta)
      );
      writeFileSync(
        join(assetIconsV5, iconMeta.className + '.tsx'),
        renderIconV5(renderMeta)
      );
      iconInfo.hash = iconMeta.hash;
      iconInfo.assetUrl = join('assets', iconMeta.file);
      if (typeof optionalMeta?.name !== 'undefined') {
        iconInfo.name = optionalMeta.name;
      }
      iconInfo.author = optionalMeta?.author;
      iconInfo.tags = optionalMeta?.tags;
      iconInfo.aliases = optionalMeta?.aliases;
      iconInfo.id = optionalMeta?.id;
      iconInfo.categories = optionalMeta?.categories;

      optionalMeta?.aliases?.forEach((a) => {
        const aliasClassName = createIconName(a);
        if (iconRegistry.has(aliasClassName.toLowerCase())) {
          console.log('- skip alias ' + aliasClassName);
          return;
        }
        const aliasContent = renderAliasIcon({
          ...renderMeta,
          iconAliasClassName: aliasClassName,
          originalIconName: iconMeta.className,
        });
        iconRegistry.add(aliasClassName.toLowerCase());
        iconInfo.aliasClassName = iconInfo.aliasClassName || [];
        iconInfo.aliasClassName.push(aliasClassName);
        writeFileSync(
          join(assetIconsV4, aliasClassName + '.tsx'),
          aliasContent
        );
        writeFileSync(
          join(assetIconsV5, aliasClassName + '.tsx'),
          aliasClassName
        );
      });

      icons.push(iconInfo);
    }

    //saving info and build time
    const metaJson = JSON.stringify(icons, null, 2);

    const contentHash = crypto.createHash('md5').update(metaJson).digest('hex');
    const build = new Date().toISOString();

    writeFileSync(join(projectFolderV4, 'meta.json'), metaJson);
    writeFileSync(join(projectFolderV5, 'meta.json'), metaJson);

    console.log('- start compiling');
    compileIcons(
      projectFolderV4,
      join(DIST_FOLDER, `v4`, config.repoFolderName)
    );
    compileIcons(
      projectFolderV5,
      join(DIST_FOLDER, `v5`, config.repoFolderName)
    );
  }
};
setup();
