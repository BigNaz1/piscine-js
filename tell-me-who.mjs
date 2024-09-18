import { readdir } from "fs/promises";

try {
    const path = process.argv[2] ?? '.';
    const guests = (await readdir(path))
        .map(f => f.split('.')[0].split('_').reverse().join(' '))
        .sort()
        .map((g, i) => `${i + 1}. ${g}`)
        .join('\n');
    console.log(guests);
} catch (e) {
    console.error(e);
}