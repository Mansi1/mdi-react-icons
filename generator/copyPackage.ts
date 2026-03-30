import ngFetch from 'ng-fetch';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { copyPathOrFile } from 'st-cp';

interface PackageInfo {
  'dist-tags': { latest: string };
  'versions': Record<string, any>
}

const V4_PACKAGE_NAME = '@material-ui-extra/icons';
const V4_SOURCE_PATH = join(__dirname, '..', 'src_v4');
const V4_PACKAGE_MATERIAL_UI_PATH = join(
  __dirname,
  '..',
  'package.v4.json'
);
const V4_DIST_PATH = join(__dirname, '..', 'dist_v4');
const V4_README = join(__dirname, '..', 'README_V4.md');

const V5_PACKAGE_NAME = '@mui-extra/icons';
const V5_SOURCE_PATH = join(__dirname, '..', 'src_v5');
const V5_PACKAGE_MATERIAL_UI_PATH = join(
  __dirname,
  '..',
  'package.v5.json'
);
const V5_DIST_PATH = join(__dirname, '..', 'dist_v5');
const V5_README = join(__dirname, '..', 'README_V5.md');

const wait = async (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const retry = async (
  type: string,
  fun: () => Promise<any> | any,
  tries: number = 0
): Promise<any> => {
  try {
    return await fun();
  } catch (error) {
    console.error('Error in retry (' + tries + ') ' + type);
    if (tries < 5) {
      await wait(100);
      return await retry(type, fun, tries + 1);
    } else {
      throw error;
    }
  }
};

const copy = async (
  distPath: string,
  sourcePath: string,
  packageName: string,
  packageJsonPath: string,
  readmeSourcePath: string
) => {
  console.log(packageName);
  const packageResponse = await ngFetch(
    `https://registry.npmjs.org/${packageName}`
  );
  const info: PackageInfo = JSON.parse(packageResponse.response.toString());

  const latestPackageVersion = info['dist-tags'].latest;

  const packageVersionParts = distPath.split('_')
  const packageVersion = packageVersionParts[packageVersionParts.length -1]

  writeFileSync(packageVersion+'_info.json',JSON.stringify(info,null,2))

  const versionResponse = await ngFetch(
    `https://unpkg.com/${packageName}@${latestPackageVersion}/version.json`
  );

  const latestVersionJSON = JSON.parse(versionResponse.response.toString());

  const currentVersionJSON = JSON.parse(
    readFileSync(join(sourcePath, 'version.json')).toString()
  );
  const isNewVersion =
    currentVersionJSON.contentHash !== latestVersionJSON.contentHash ||
    currentVersionJSON.projectVersion !== latestVersionJSON.projectVersion;
  let newPackageVersion = latestPackageVersion;
  if (isNewVersion) {
    console.log('isNewVersion');
    const [major, minor, patch] = latestPackageVersion.split('.');
    newPackageVersion = [major, minor, parseInt(patch) + 1].join('.');
  }
  console.log('currentVersion', currentVersionJSON);
  console.log('latestVersion', latestVersionJSON);

  const packageJSON = JSON.parse(readFileSync(packageJsonPath).toString());
  packageJSON.version = newPackageVersion;

  writeFileSync(
    join(distPath, 'package.json'),
    JSON.stringify(packageJSON, null, 2)
  );
  copyPathOrFile(readmeSourcePath, {
    path: join(distPath, 'README.md'),
    isDirectory: false,
  });
  copyPathOrFile(join(sourcePath, 'version.json'), {
    path: join(distPath, 'version.json'),
    isDirectory: false,
  });
  copyPathOrFile(join(sourcePath, 'meta.json'), {
    path: join(distPath, 'meta.json'),
    isDirectory: false,
  });
  copyPathOrFile(join(sourcePath, 'assets'), {
    path: distPath,
    isDirectory: true,
  });
  copyPathOrFile(join(__dirname, '..', 'LICENSE'), {
    path: join(distPath, 'LICENSE'),
    isDirectory: false,
  });

  const esmPackageJson = join(distPath, 'esm', 'package.json');
  writeFileSync(esmPackageJson, JSON.stringify({ type: 'module' }, null, 2));
};

(async () => {
  await retry('copy_v4', async () => {
    await copy(
      V4_DIST_PATH,
      V4_SOURCE_PATH,
      V4_PACKAGE_NAME,
      V4_PACKAGE_MATERIAL_UI_PATH,
      V4_README
    );
  });

  await retry('copy_v5', async () => {
    await copy(
      V5_DIST_PATH,
      V5_SOURCE_PATH,
      V5_PACKAGE_NAME,
      V5_PACKAGE_MATERIAL_UI_PATH, 
      V5_README
    );
  });
})();
