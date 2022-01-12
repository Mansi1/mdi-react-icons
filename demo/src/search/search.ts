import elasticlunr from "elasticlunr";
import metaJson from "@material-ui-extra/icons/meta.json"

type Data = {id: string; name: string; aliases: Array<string>; tags: Array<string>};

export const searchIndex = elasticlunr<Data>();

searchIndex.addField('name');
searchIndex.addField('aliases');
searchIndex.addField('tags');
searchIndex.setRef('id');

(metaJson as Array<Data>).forEach((date) => searchIndex.addDoc(date))
