import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const FILE_EXTENSION = '.json';
const POSITIVE_ANSWER = 'yes';

async function createVipList() {
    try {
        const path = process.argv[2] ?? '.';
        const vips = (await Promise.all(
            (await readdir(path))
                .filter(file => file.endsWith(FILE_EXTENSION))
                .map(async file => {
                    const filePath = join(path, file);
                    const data = JSON.parse(await readFile(filePath, 'utf8'));
                    return data.answer.toLowerCase() === POSITIVE_ANSWER
                        ? file.split('.')[0].split('_').reverse().join(' ')
                        : null;
                })
        ))
        .filter(Boolean)
        .sort()
        .map((guest, index) => `${index + 1}. ${guest}`)
        .join('\n');

        await writeFile('vip.txt', vips);
        console.log('VIP list has been saved to vip.txt');
    } catch (error) {
        console.error('An error occurred while creating the VIP list:', error);
    }
}

createVipList();