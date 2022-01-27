
import fsPromises from 'fs/promises';


export const readJSONConfigDir = async (dir) => Object.fromEntries(Promise.all((await fsPromises.readdir(dir)).map(async (file) => [file.split('.')[0], JSON.parse(await fsPromises.readFile(`${dir}/${file}`))])));
