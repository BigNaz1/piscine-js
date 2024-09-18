import { readFile, writeFile } from 'fs/promises';

async function cypherFile(inputFile, action, outputFile) {
    try {
        const content = await readFile(inputFile, 'utf8');
        let result;

        if (action === 'encode') {
            result = Buffer.from(content).toString('base64');
            outputFile = outputFile || 'cypher.txt';
        } else if (action === 'decode') {
            result = Buffer.from(content, 'base64').toString('utf8');
            outputFile = outputFile || 'clear.txt';
        } else {
            throw new Error('Invalid action. Use "encode" or "decode".');
        }

        await writeFile(outputFile, result);
        console.log(`File ${action}d and saved as ${outputFile}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

const [,, inputFile, action, outputFile] = process.argv;

if (!inputFile || !action) {
    console.error('Usage: node tell-it-cypher.mjs <input-file> <encode|decode> [output-file]');
    process.exit(1);
}

cypherFile(inputFile, action, outputFile);