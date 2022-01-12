import {get} from "https";
import {mkdirSync, readFileSync, writeFileSync} from "fs";
import {join, relative} from "path";
import {parseString} from 'xml2js';
import {render} from "mustache";
import * as crypto from "crypto";

interface IconMustacheViewData extends IconData {
    iconClassName: string
    paths: Array<string>
    url: string;
}

interface IconAliasMustacheViewData extends IconData {
    iconAliasClassName: string
    originalIconName: string
    url: string;
}

interface IconAllMustacheViewData {
    imports: Array<string>;
    icons: Array<string>
}

export interface WriteIcon extends IconData {
    assetsUrl: string;
    componentFileName: string;
}

export interface IconData {
    id: string;
    name: string;
    codepoint: string;
    aliases: string[];
    tags: string[];
    author: string;
    version: string;
}

export const iife = (fun: () => unknown) => {
    fun()
}

export const renderIconV4 = (viewData: IconMustacheViewData) => {
    const templatePath = join(__dirname, 'icon-template-v4.mustache');
    const templateString = readFileSync(templatePath).toString('utf8')
    return render(templateString, viewData);
}
export const renderIconV5 = (viewData: IconMustacheViewData) => {
    const templatePath = join(__dirname, 'icon-template-v5.mustache');
    const templateString = readFileSync(templatePath).toString('utf8')
    return render(templateString, viewData);
}

export const renderAliasIcon = (viewData: IconAliasMustacheViewData) => {
    const templatePath = join(__dirname, 'icon-alias-template.mustache');
    const templateString = readFileSync(templatePath).toString('utf8')
    return render(templateString, viewData);
}

export const renderAllIcon = (viewData: IconAllMustacheViewData) => {
    const templatePath = join(__dirname, 'icon-all.mustache');
    const templateString = readFileSync(templatePath).toString('utf8')
    return render(templateString, viewData);
}


const download = async (url: string): Promise<string> => {
    return await new Promise((resolve, reject) => {
        const data: Array<string> = [];
        get(url, (response) => {
            response
                .on("data", append => data.push(append))
                .on("end", () => resolve(data.join('')))
        }).on("error", reject)
    });
};
const wait = async (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const iconRegistry: { [name: string]: boolean } = {};

const retry = async <T>(type: string, fun: () => Promise<T> | T, tries: number = 0): Promise<T> => {
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
const getMetaDataJSON = async () => {
    return JSON.parse(await download('https://raw.githubusercontent.com/Templarian/MaterialDesign/master/meta.json'));
}
const V4_SRC_PATH = join(__dirname, '..', 'src_v4');
const V4_PROJECT_PACKAGE_JSON = join(__dirname, '..', 'package.json');
const V4_ASSETS_PATH = join(V4_SRC_PATH, 'assets');
const V4_METADATA_JSON = join(V4_SRC_PATH, 'meta.json');
const V4_VERSION = join(V4_SRC_PATH, 'version.json');
const V4_ICONS_PATH = join(V4_SRC_PATH, 'icons');

const V5_SRC_PATH = join(__dirname, '..', 'src_v5');
const V5_PROJECT_PACKAGE_JSON = join(__dirname, '..', 'package.json');
const V5_ASSETS_PATH = join(V5_SRC_PATH, 'assets');
const V5_METADATA_JSON = join(V5_SRC_PATH, 'meta.json');
const V5_VERSION = join(V5_SRC_PATH, 'version.json');
const V5_ICONS_PATH = join(V5_SRC_PATH, 'icons');

mkdirSync(V4_ASSETS_PATH, {recursive: true});
mkdirSync(V4_ICONS_PATH, {recursive: true});

mkdirSync(V5_ASSETS_PATH, {recursive: true});
mkdirSync(V5_ICONS_PATH, {recursive: true});

const chunk = (arr: Array<any>, size = 500): Array<Array<any>> => {
    const results = [];
    while (arr.length) {
        results.push(arr.splice(0, size));
    }
    return results;
};

const getSvgPath = async (svgStr: string) => {
    const data: any = await new Promise((resolve, reject) => {
        parseString(svgStr, (err: Error, result: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }

        })
    });
    return data.svg.path.map((p: any) => p['$'].d);
}
export const createIconName = (rawName: string) => {
    let prefix = '';
    if (rawName.match(/^\d/)) {
        prefix = '_'
    }
    return `${prefix}${rawName.split('-').map((v: string) => v.substring(0, 1).toUpperCase() + v.substring(1)).join('')}Icon`
}
const downloadAndWrite = async (metaData: IconData): Promise<WriteIcon> => {
    return retry('process ' + metaData.name, async () => {

        const url = `https://raw.githubusercontent.com/Templarian/MaterialDesign/master/svg/${metaData.name}.svg`;
        const assetsSVGFileV4 = join(V4_ASSETS_PATH, `${metaData.name}.svg`);
        const assetsSVGFileV5 = join(V5_ASSETS_PATH, `${metaData.name}.svg`);

        const rawSVG = await retry('download ' + metaData.name, async () => download(url));
        const svgPaths = await getSvgPath(rawSVG);

        const iconClassName = createIconName(metaData.name)
        const componentAliasFileNames: Array<string> = [];
        const data: IconMustacheViewData = {...metaData, url, paths: svgPaths, iconClassName}
        const renderedV4 = renderIconV4(data);
        const renderedV5 = renderIconV5(data);
        const componentFileName = `${iconClassName}.tsx`;
        const componentPathV4 = join(V4_ICONS_PATH, componentFileName);
        const componentPathV5 = join(V5_ICONS_PATH, componentFileName);
        writeFileSync(assetsSVGFileV4, rawSVG);
        writeFileSync(componentPathV4, renderedV4);
        
        writeFileSync(assetsSVGFileV5, rawSVG);
        writeFileSync(componentPathV5, renderedV5);

        iconRegistry[iconClassName.toLowerCase()] = true;

        for (let i = 0; i < data.aliases.length; i = i + 1) {
            const aliasIconClassName = createIconName(data.aliases[i]);
            if (!iconRegistry[aliasIconClassName.toLowerCase()]) {
                const renderedAlias = renderAliasIcon({
                    ...data,
                    originalIconName: iconClassName,
                    iconAliasClassName: aliasIconClassName,
                });

                const componentAliasFileName = `${aliasIconClassName}.tsx`;
                const componentAliasPathV4 = join(V4_ICONS_PATH, componentAliasFileName);
                const componentAliasPathV5 = join(V5_ICONS_PATH, componentAliasFileName);
                componentAliasFileNames.push(aliasIconClassName)
                writeFileSync(componentAliasPathV4, renderedAlias);
                writeFileSync(componentAliasPathV5, renderedAlias);
                iconRegistry[aliasIconClassName.toLowerCase()] = true;
            }
        }

        return {
            ...metaData,
            assetsUrl: relative(V4_SRC_PATH, assetsSVGFileV4),
            componentFileName: iconClassName,
            componentAliasFileNames
        }
    });
}

iife(async () => {
    console.log('start material ui icons generation')
    const icons: Array<IconData> = await getMetaDataJSON();
    console.log('downloaded meta data')

    const totalSize = icons.length;
    const chunks: Array<Array<IconData>> = chunk(icons);
    const createdIcons: Array<WriteIcon> = [];
    let downloaded = 0;
    for (const chunk of chunks) {
        console.log(downloaded + '/' + totalSize + ' downloaded files')

        createdIcons.push(...await Promise.all(chunk.map((icon: IconData) => downloadAndWrite(icon))));
        downloaded += chunk.length
    }
    console.log(downloaded + '/' + totalSize + ' downloaded files')

    const metaJSON = JSON.stringify(createdIcons);
    const {version} = JSON.parse(readFileSync(V4_PROJECT_PACKAGE_JSON).toString());
    const contentHash = crypto.createHash('md5').update(metaJSON).digest("hex");
    
    const versionContent = JSON.stringify({
        build: (new Date()).toISOString(),
        contentHash: contentHash,
        projectVersion: version
    })
    
    writeFileSync(V4_VERSION, versionContent);
    writeFileSync(V5_VERSION, versionContent);

    writeFileSync(V4_METADATA_JSON, metaJSON);
    writeFileSync(V5_METADATA_JSON, metaJSON);
    console.log('generation done')
});
