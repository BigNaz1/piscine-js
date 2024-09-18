import { readdir } from 'fs/promises';
import { resolve } from 'path';

async function countEntries(dirPath) {
    try {
        const entries = await readdir(dirPath);
        console.log(entries.length);
    } catch (error) {
        console.error(`Error reading directory: ${error.message}`);
        process.exit(1);
    }
}

const dirPath = process.argv[2] ? resolve(process.argv[2]) : process.cwd();

countEntries(dirPath);