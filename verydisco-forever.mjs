import fs from 'fs/promises';

const input = process.argv[2];

if (!input) {
    console.error('Please provide an argument.');
    process.exit(1);
}

function makeVeryDisco(word) {
    const midpoint = Math.ceil(word.length / 2);
    return word.slice(midpoint) + word.slice(0, midpoint);
}

const veryDiscoResult = input.split(' ')
    .map(makeVeryDisco)
    .join(' ');

await fs.writeFile('verydisco-forever.txt', veryDiscoResult);