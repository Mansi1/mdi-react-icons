import {get} from "https";
import {mkdirSync, readFileSync, writeFileSync} from "fs";
import {join} from "path";
import {parseString} from 'xml2js';
import {render} from "mustache";

interface IconMustacheViewData {
    importName: string;
    iconClassName: string
}

interface IconAllMustacheViewData {
    imports: Array<string>;
    icons: Array<string>
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

const retry = async (type: string, fun: () => Promise<any> | any, tries: number = 0) => {
    try {
        return await fun();
    } catch (error) {
        console.error('Error in retry (' + tries + ') ' + type)
        console.error(error)
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
const ASSETS_PATH = join(__dirname, '..', 'src', 'assets');
const ICONS_PATH = join(__dirname, '..', 'src', 'icons');

mkdirSync(ASSETS_PATH, {recursive: true});
mkdirSync(ICONS_PATH, {recursive: true});

const chunk = (arr: Array<Promise<any>>, size = 1000): Array<Array<Promise<any>>> => {
    const results = [];
    while (arr.length) {
        results.push(arr.splice(0, size));
    }
    return results;
};

const getSvgPath = async (fileName: string, svgStr: string) => {
    const data: any = await new Promise((resolve, reject) => {
        parseString(svgStr, (err: Error, result: any) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }

        })
        return data.svg.path.map((p: any) => p['$'].d);
    });
}

const downloadAndWrite = async (metaData: any) => {
    const url = `https://raw.githubusercontent.com/Templarian/MaterialDesign/master/svg/${metaData.name}.svg`;
    const file = join(ASSETS_PATH, `${metaData.name}.svg`);

    const svg = await retry('download ' + metaData.name, async () => download(url));

    const paths = await getSvgPath(metaData.name, svg);
    const iconClassName = `Mdi${metaData.name.split('-').map((v: string) => v.substring(0, 1).toUpperCase() + v.substring(1)).join('')}`
    const data = {...metaData, url, file, paths, iconClassName}
    const rendered = renderIcon(data);

    writeFileSync(file, svg);
    writeFileSync(join(ICONS_PATH, `${iconClassName}.tsx`), rendered);

    return {
        import: `import { ${iconClassName} } from \'./${iconClassName}\';`,
        icon: `<${iconClassName} fontSize="large"/>`
    }
}

iife(async () => {
    console.log('start material ui icons generation')
    const metaDatas = await getMetaDataJSON();
    console.log('downloaded meta data')
    const chunks = chunk(metaDatas);
    const icons: Array<{ icon: string, import: string }> = []
    for (const chunk of chunks) {
        const iconChunk = await Promise.all(chunk.map((metaData: any) => downloadAndWrite(metaData)));
        icons.push(...iconChunk);
    }

    writeFileSync(join(ICONS_PATH, `MdiAllIcons.tsx`), renderAllIcon({
        imports: icons.map(i => i.import),
        icons: icons.map(i => i.icon)
    }));

    console.log('generation done')
});
