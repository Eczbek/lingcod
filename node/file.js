
import fsPromises from 'fs/promises';


/**
 * Creates an object of file names and file data from config directory
 * @param {string} path 
 * @returns {Object}
 */
export const readJSONConfigDir = async (path) => Object.fromEntries(Promise.all((await fsPromises.readdir(path)).map(async (file) => [file.split('.')[0], JSON.parse(await fsPromises.readFile(`${path}/${file}`))])));
