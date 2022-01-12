import ngFetch from 'ng-fetch';
import * as path from 'path';
import {readFileSync, writeFileSync} from 'fs';
import {copyPathOrFile} from "st-cp";

interface PackageInfo {
    "dist-tags": { "latest": string }
}

const V4_PACKAGE_NAME = "@material-ui-extra/icons"
const V4_SOURCE_PATH = path.join(__dirname, '..', 'src_v4')
const V4_PACKAGE_MATERIAL_UI_PATH = path.join(__dirname, '..', 'package.v4.json')
const V4_DIST_PATH = path.join(__dirname, '..', 'dist_v4')
const V4_README = path.join(__dirname, '..', 'README_V4.md')

const V5_PACKAGE_NAME = "@mui-extra/icons"
const V5_SOURCE_PATH = path.join(__dirname, '..', 'src_v4')
const V5_PACKAGE_MATERIAL_UI_PATH = path.join(__dirname, '..', 'package.v5.json')
const V5_DIST_PATH = path.join(__dirname, '..', 'dist_v5')
const V5_README = path.join(__dirname, '..', 'README_V5.md')

const wait = async (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const retry = async (type: string, fun: () => Promise<any> | any, tries: number = 0): Promise<any> => {
    try {
        return await fun();
    } catch (error) {
        console.error('Error in retry (' + tries + ') ' + type)
        if (tries < 5) {
            await wait(100);
            return await retry(type, fun, tries + 1)
        } else {
            throw error;
        }
    }

}

const copy = async (
    distPath: string,
    sourcePath: string,
    packageName: string,
    packageJsonPath: string,
    readmeSourcePath: string) => {
    console.log(packageName)
    let latestVersionJSON = {contentHash: '', projectVersion: ''}
    let latestPackageVersion = '0.0.0'
    try {
        const packageResponse = await ngFetch(`https://registry.npmjs.org/${packageName}`);
        const info: PackageInfo = JSON.parse(packageResponse.response.toString());
        latestPackageVersion = info["dist-tags"].latest;
        const versionResponse = await ngFetch(`https://unpkg.com/${packageName}@${latestPackageVersion}/version.json`)
        latestVersionJSON = JSON.parse(versionResponse.response.toString());
    } catch (e) {
    }

    const currentVersionJSON = JSON.parse(readFileSync(path.join(sourcePath, 'version.json')).toString());
    const isNewVersion = currentVersionJSON.contentHash !== latestVersionJSON.contentHash ||
        currentVersionJSON.projectVersion !== latestVersionJSON.projectVersion;
    let newPackageVersion = latestPackageVersion;
    if (isNewVersion) {
        const [major, minor, patch] = latestPackageVersion.split('.')
        newPackageVersion = [major, minor, parseInt(patch) + 1].join('.')
    }
    console.log('currentVersion', currentVersionJSON)
    console.log('latestVersion', latestVersionJSON)

    const packageJSON = JSON.parse(readFileSync(packageJsonPath).toString());
    packageJSON.version = newPackageVersion;

    writeFileSync(path.join(distPath, 'package.json'), JSON.stringify(packageJSON, null, 2))
    copyPathOrFile(readmeSourcePath, {path: path.join(distPath, 'README.md'), isDirectory: false});
    copyPathOrFile(path.join(sourcePath, 'version.json'), {
        path: path.join(distPath, 'version.json'),
        isDirectory: false
    });
    copyPathOrFile(path.join(sourcePath, 'meta.json'), {path: path.join(distPath, 'meta.json'), isDirectory: false});
    copyPathOrFile(path.join(sourcePath, 'assets'), {path: distPath, isDirectory: true});
    copyPathOrFile(path.join(__dirname, '..', 'LICENSE'), {path: path.join(distPath, 'LICENSE'), isDirectory: false});
}
(async () => {
    await retry('copy_v4', async () => {
        await copy(V4_DIST_PATH, V4_SOURCE_PATH, V4_PACKAGE_NAME, V4_PACKAGE_MATERIAL_UI_PATH, V4_README)
    });

    await retry('copy_v5', async () => {
        await copy(V5_DIST_PATH, V5_SOURCE_PATH, V5_PACKAGE_NAME, V5_PACKAGE_MATERIAL_UI_PATH, V5_README)
    });
})()
