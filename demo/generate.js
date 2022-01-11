const fs = require('fs');
const path = require('path');

const metaJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'node_modules', '@material-ui-extra', 'icons', 'meta.json')))
const imports = ['import React from \'react\';', 'import {MdiIcon} from "./../MdiIcon";'];
const lines = ['', 'export const ICON_MAP: {[id: string]: any} = {'];
const tags = {}
const tagsMap = {}
const addTag = (tag, id) => {
    if (!tagsMap[tag]) {
        tagsMap[tag] = []
    }
    tagsMap[tag].push(id);
}
metaJson.forEach((icon, index) => {
    icon.tags.forEach(tag => {
        tags[tag] = true
        addTag(tag, icon.id)
    });
    if (icon.tags.length === 0) {
        addTag('None', icon.id)
    }
    imports.push('import ' + icon.componentFileName + ' from "@material-ui-extra/icons/' + icon.componentFileName + '";')
    imports.push('import ' + icon.componentFileName + 'Url from "@material-ui-extra/icons/' + icon.assetsUrl + '";')
    lines.push('    "' + icon.id + '": <MdiIcon icon={{ id: "' + icon.id + '", name: "' + icon.name + '", assetsUrl: ' + icon.componentFileName + 'Url' + ', componentFileName: "' + icon.componentFileName + '", codepoint: "' + icon.codepoint + '", version: "' + icon.version + '", author: "' + icon.author + '", tags: [' + icon.tags.map(v => '"' + v + '"') + '], aliases: [' + icon.aliases.map(v => '"' + v + '"') + '], cmp: <' + icon.componentFileName + ' fontSize="inherit" /> }} />,')
})

lines.push('};');
imports.push('')
imports.push('')

tags.None = true

const tagType = 'export type Tag = ' + Object.keys(tags).map(v => "'" + v + "'").join('|') + ';\n';
const tagTypeValues = 'export const TAG_VALUES: Array<Tag> = [' + Object.keys(tags).map(v => "'" + v + "'").join(',') + '];\n';
const generationPath = path.join(__dirname, 'src', 'generated');

fs.mkdirSync(generationPath, {recursive: true})
fs.writeFileSync(path.join(generationPath, 'iconMap.tsx'), imports.join('\n') + tagType + tagTypeValues + lines.join('\n'))
fs.writeFileSync(path.join(generationPath, 'tagsMap.json'), JSON.stringify(tagsMap, null, 2))
fs.writeFileSync(path.join(generationPath, 'meta.json'), JSON.stringify(metaJson, null, 2))
