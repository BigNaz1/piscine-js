import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function createVipList(dirPath) {
    try {
        const files = await readdir(dirPath);
        const guestList = await Promise.all(files.map(async (file) => {
            const filePath = join(dirPath, file);
            const content = await readFile(filePath, 'utf8');
            const guestInfo = JSON.parse(content);
            const [lastName, firstName] = file.split('_');
            return { 
                name: `${lastName} ${firstName.slice(0, -4)}`,
                answer: guestInfo.answer
            };
        }));

        const vipGuests = guestList
            .filter(guest => guest.answer === 'YES')
            .map(guest => guest.name)
            .sort((a, b) => a.localeCompare(b))
            .map((guest, index) => `${index + 1}. ${guest}`)
            .join('\n');

        await writeFile('vip.txt', vipGuests);
        console.log('VIP list has been saved to vip.txt');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const dirPath = process.argv[2] || process.cwd();

createVipList(dirPath);