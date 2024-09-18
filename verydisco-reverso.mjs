import fs from 'fs/promises';

const fileName = process.argv[2];

async function readAndDecipherFile(fileName) {
    const content = await fs.readFile(fileName, 'utf8');
    const decipheredContent = decipherVeryDisco(content);
    console.log(decipheredContent);
}

function decipherVeryDisco(text) {
    return text.split(' ')
        .map(reverseVeryDisco)
        .join(' ');
}

function reverseVeryDisco(word) {
    const midpoint = Math.floor(word.length / 2);
    return word.slice(-midpoint) + word.slice(0, -midpoint);
}

readAndDecipherFile(fileName);