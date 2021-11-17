const fs = require('fs');
const path = require('path');

const metaJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'node_modules', '@material-ui-extra', 'icons', 'meta.json')))
const imports = ['import React from \'react\';', 'import {MdiIcon} from "./../MdiIcon";'];
const lines = ['', 'export const AllIcons = () => (<>'];
const tags = {}

metaJson.forEach(icon => {
    icon.tags.forEach(tag => tags[tag] = true);
    imports.push('import ' + icon.componentFileName + ' from "@material-ui-extra/icons/' + icon.componentFileName + '";')
    imports.push('import ' + icon.componentFileName + 'Url from "@material-ui-extra/icons/' + icon.assetsUrl + '";')
    lines.push('<MdiIcon icon={{ id: "' + icon.id + '", name: "' + icon.name + '", assetsUrl: ' + icon.componentFileName + 'Url' + ', componentFileName: "' + icon.componentFileName + '", codepoint: "' + icon.codepoint + '", version: "' + icon.version + '", author: "' + icon.author + '", tags: [' + icon.tags.map(v => '"' + v + '"') + '], aliases: [' + icon.aliases.map(v => '"' + v + '"') + '], cmp: <' + icon.componentFileName + ' fontSize="inherit" /> }} />')
})
lines.push('</>', ');');
imports.push('')
imports.push('')

const tagType = 'export type Tag = ' + Object.keys(tags).map(v => "'" + v + "'").join('|') + ';\n';
const tagTypeValues = 'export const TagValues:Array<Tag> = [' + Object.keys(tags).map(v => "'" + v + "'").join(',') + '];\n';
const generationPath =path.join(__dirname, 'src', 'generated');
fs.mkdirSync(generationPath,{recursive: true} )
fs.writeFileSync(path.join(generationPath,'AllIcons.tsx'), imports.join('\n') + tagType + tagTypeValues + lines.join('\n'))
