
const fs = require('fs');
const path = require('path');

const metaJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'node_modules', '@material-ui-extra', 'icons', 'meta.json')))
const lines = [];
lines.push('import {Icon} from "./../interfaces/Icon";')
lines.push('import DATA from "@material-ui-extra/icons/meta.json";')
lines.push('import {getIdentityMap} from "@milkscout/react";')
lines.push('import {getIdentityArrayMap} from "../functions/getIdentityArrayMap";')
lines.push('')

const tagsMap = {'None': true}
const addTag = (tag) => {
    if (!tagsMap[tag]) {
        tagsMap[tag] = true
    }
    tagsMap[tag];
}

metaJson.forEach((icon) => {
    icon.tags.forEach(tag => {
        addTag(tag, icon.id)
    });
    if (icon.tags.length === 0) {
        addTag('None', icon.id)
    }
})

const tags = Object.keys(tagsMap).sort();
const tagType = 'export type Tag = ' + tags.map(v => "'" + v + "'").join('|') + ';\n';
const tagTypeValues = 'export const TAG_VALUES: Array<Tag> = [' + tags.map(v => "'" + v + "'").join(',') + '];\n';

lines.push(tagType)
lines.push(tagTypeValues)
lines.push('')
lines.push('export const ICON_MAP: {[id: string]: Icon} = getIdentityMap(DATA, (icon: Icon) => icon.id);')
lines.push('export const TAG_ARRAY_MAP: {[tag: string]: Array<Icon>} = getIdentityArrayMap(DATA, (icon: Icon) => {if(!!icon.tags[0]){')
lines.push('        return icon.tags[0]')
lines.push('    }')
lines.push('    return \'NONE\'')
lines.push('});')

const generationPath = path.join(__dirname, 'src', 'generated');
const publicPath = path.join(__dirname, 'public');


fs.mkdirSync(generationPath, {recursive: true})

fs.writeFileSync(path.join(generationPath, 'iconMap.tsx'), lines.join('\n'))
fs.writeFileSync(path.join(publicPath, 'info.json'), JSON.stringify({ date: new Date()}))
