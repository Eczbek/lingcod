
import fsPromises from 'fs/promises';


export async function readJSONConfigDir (path) {
	return Object.fromEntries(await Promise.all((await fsPromises.readdir(path)).map(async (file) => [file.split('.')[0], JSON.parse(await fsPromises.readFile(`${path}/${file}`))])));
}
