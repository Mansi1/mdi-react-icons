import ngFetch from 'ng-fetch';
import * as path from 'path';
import {readFileSync, writeFileSync} from 'fs';

interface PackageInfo {
    "dist-tags": { "latest": string }
}

const CURRENT_VERSION_JSON_PATH = path.join(__dirname, '..', 'src', 'version.json')
const PACKAGE_MATERIAL_UI_PATH = path.join(__dirname, '..', 'package-material-ui.json')
const PACKAGE_MATERIAL_UI_DIST_PATH = path.join(__dirname, '..', 'dist', 'package.json')
const main = async () => {
    const packageResponse = await ngFetch(`https://registry.npmjs.org/@material-ui-extra/icons`);
    const info: PackageInfo = JSON.parse(packageResponse.response.toString());
    const latestPackageVersion = info["dist-tags"].latest;
    const versionResponse = await ngFetch(`https://unpkg.com/@material-ui-extra/icons@${latestPackageVersion}/version.json`)
    const currentVersionJSON = JSON.parse(readFileSync(CURRENT_VERSION_JSON_PATH).toString());
    const latestVersionJSON = JSON.parse(versionResponse.response.toString());

    const isNewVersion = currentVersionJSON.contentHash !== latestVersionJSON.contentHash ||
        currentVersionJSON.projectVersion !== latestVersionJSON.projectVersion;
    let newPackageVersion = latestPackageVersion;
    if (isNewVersion) {
        const [major, minor, patch] = latestPackageVersion.split('.')
        newPackageVersion = [major, minor, parseInt(patch) + 1].join('.')
    }
    
    console.log('current package version:' +latestPackageVersion);
    console.log('new package version:' +newPackageVersion);

    const packageJSON = JSON.parse(readFileSync(PACKAGE_MATERIAL_UI_PATH).toString());
    packageJSON.version = newPackageVersion;
    writeFileSync(PACKAGE_MATERIAL_UI_DIST_PATH, JSON.stringify(packageJSON, null, 2))
}
main();