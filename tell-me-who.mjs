import { readdir } from 'fs/promises';
import { resolve } from 'path';

async function listGuests(dirPath) {
    try {
        const files = await readdir(dirPath);
        const guestList = await Promise.all(files.map(async (file) => {
            const [lastName, firstName] = file.split('_');
            return `${lastName} ${firstName.slice(0, -4)}`;
        }));

        guestList.sort((a, b) => a.localeCompare(b));

        guestList.forEach((guest, index) => {
            console.log(`${index + 1}. ${guest}`);
        });
    } catch (error) {
        console.error(`Error reading directory: ${error.message}`);
        process.exit(1);
    }
}

const dirPath = process.argv[2] ? resolve(process.argv[2]) : process.cwd();

listGuests(dirPath);