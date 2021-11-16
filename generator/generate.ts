import {get} from "https";
import {mkdirSync, readFileSync, writeFileSync} from "fs";
import {join, relative} from "path";
import {parseString} from 'xml2js';
import {render} from "mustache";

interface IconMustacheViewData extends IconData {
    iconClassName: string
    paths: Array<string>
    url: string;
}

interface IconAllMustacheViewData {
    imports: Array<string>;
    icons: Array<string>
}

export interface WriteIcon extends IconData{
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

export const renderIcon = (viewData: IconMustacheViewData) => {
    const templatePath = join(__dirname, 'icon-template.mustache');
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
const getMetaDataJSON = async () => {
    return JSON.parse(await download('https://raw.githubusercontent.com/Templarian/MaterialDesign/master/meta.json'));
}
const SRC_PATH = join(__dirname, '..', 'src');
const ASSETS_PATH = join(SRC_PATH, 'assets');
const METADATA_JSON = join(SRC_PATH, 'meta.json');
const ICONS_PATH = join(SRC_PATH, 'icons');

mkdirSync(ASSETS_PATH, {recursive: true});
mkdirSync(ICONS_PATH, {recursive: true});

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

const downloadAndWrite = async (metaData: IconData): Promise<WriteIcon> => {
    const url = `https://raw.githubusercontent.com/Templarian/MaterialDesign/master/svg/${metaData.name}.svg`;
    const assetsSVGFile = join(ASSETS_PATH, `${metaData.name}.svg`);

    const rawSVG = await retry('download ' + metaData.name, async () => download(url));
    const svgPaths = await getSvgPath(rawSVG);

    const iconClassName = `${metaData.name.split('-').map((v: string) => v.substring(0, 1).toUpperCase() + v.substring(1)).join('')}Icon`
    const data: IconMustacheViewData = {...metaData, url, paths: svgPaths, iconClassName}
    const rendered = renderIcon(data);
    const componentFileName = `${iconClassName}.tsx`;
    const componentPath = join(ICONS_PATH, componentFileName);
    writeFileSync(assetsSVGFile, rawSVG);
    writeFileSync(componentPath, rendered);

    return {...metaData, assetsUrl: relative(SRC_PATH,assetsSVGFile), componentFileName: iconClassName}
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
        
        createdIcons.push(...await Promise.all(chunk.map((icon: IconData) => downloadAndWrite(icon))));
        downloaded += chunk.length
        console.log(downloaded +'/'+totalSize+ ' downloaded files')
    }

    writeFileSync(METADATA_JSON, JSON.stringify(createdIcons, null, 2));
    console.log('generation done')
});
