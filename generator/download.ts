import { get } from 'https';
import { writeFileSync, existsSync, readFileSync } from 'fs';
import { retry } from './copySourceFiles';
export const getHistory = async (pkgName: string): Promise<any> => {
  console.log('packageName', pkgName);
  const url = 'https://registry.npmjs.org/' + pkgName;
  const registerData = await downloadJson(url);

  const versionsObj = registerData?.time ?? {};
  delete versionsObj['created'];
  delete versionsObj['modified'];

  const versions = Object.entries<string>(versionsObj)
    .map(([key, value]) => ({
      version: key,
      date: new Date(value as string),
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const versionsCopy = [...versions];
  const downloadVersions: Array<any> = [];
  const chunkSize = 2;
  for (let i = 0; i < versionsCopy.length; i += chunkSize) {
    const versionPairs = versionsCopy.slice(i, i + chunkSize);
    if (versionPairs.length > 0) {
      downloadVersions.push(
        ...(await Promise.all(
          versionPairs.map(async (version) =>
            retry(`download retry ${pkgName} ${version.version}`, async () => {
              const outputPath =
                __dirname +
                '/history/' +
                pkgName +
                '/' +
                version.version +
                '.meta.json';

              if (!existsSync(outputPath)) {
                console.log(`download start ${pkgName} ${version.version}`);
                const metaJson = await downloadJson(
                  'https://unpkg.com/' +
                    pkgName +
                    '@' +
                    version.version +
                    '/meta.json'
                );
                writeFileSync(outputPath, JSON.stringify(metaJson, null, 2));
                console.log(`download complete ${pkgName} ${version.version}`);
                return {
                  pkgName,
                  version: version.version,
                  date: version.date,
                  content: metaJson,
                };
              } else {
                console.log(`already downloaded ${pkgName} ${version.version}`);
                return {
                  pkgName,
                  version: version.version,
                  date: version.date,
                  content: JSON.parse(readFileSync(outputPath).toString()),
                };
              }
            })
          )
        ))
      );
    }
  }
  return downloadVersions
    .map((v) => ({
      version: v.version,
      icons: v.content.map((i) => i.name),
    }))
    .reduce((prev, curr, index, all) => {
      if (index === 0) {
        (curr as any).new = curr.icons;
      } else {
        const lastIcons = all[index - 1].icons;
        const currIcons = curr.icons;
        (curr as any).new = currIcons.filter(
          (ci) => lastIcons.indexOf(ci) === -1
        );
        (curr as any).deleted = lastIcons.filter(
          (ci) => currIcons.indexOf(ci) === -1
        );
      }
      prev.push(curr);
      return prev;
    }, [] as Array<any>)
    .map((c) => {
      delete c.icons;
      return c;
    });
};

const downloadJson = async (url: string) => {
  console.log('download url', url);
  return JSON.parse(
    await new Promise((resolve, reject) => {
      get(url, (res) => {
        if (res.statusCode === 404) {
          resolve('{}');
        }
        if (res.statusCode !== 200) {
          reject(url + ' wrong status code ' + res.statusCode);
        }
        let data = '';
        // Collect data chunks
        res.on('data', (chunk) => {
          data += chunk;
        });

        // End of the response
        res.on('end', () => {
          resolve(data);
        });
      }).on('error', (err) => {
        reject(err.message);
      });
    })
  );
};
