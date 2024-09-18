import fs from 'fs/promises';
import path from 'path';

const [,, fileName, command, elem, quantity] = process.argv;

const readList = async (fileName) => {
    try {
        const data = await fs.readFile(fileName, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return {};
    }
};

const writeList = async (fileName, data) => {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
};

const printList = (list) => {
    if (Object.keys(list).length === 0) {
        console.log('Empty list.');
    } else {
        for (const [item, count] of Object.entries(list)) {
            console.log(`- ${item} (${count})`);
        }
    }
};

const printHelp = () => {
    console.log('Commands:');
    console.log('- create: takes a filename as argument and create it (should have `.json` extension specified)');
    console.log('- delete: takes a filename as argument and delete it');
    console.log('- add: adds a new element to the list or increases its quantity');
    console.log('- rm: removes an element from the list or decreases its quantity');
    console.log('- ls: prints the current list');
    console.log('- help: prints this help message');
};

const main = async () => {
    if (!fileName || !command) {
        return printHelp();
    }

    switch (command) {
        case 'create':
            await fs.writeFile(fileName, '{}');
            console.log(`File ${fileName} created.`);
            break;

        case 'delete':
            await fs.unlink(fileName);
            console.log(`File ${fileName} deleted.`);
            break;

        case 'add':
        case 'rm':
            if (!elem) {
                console.log('No elem specified.');
                return;
            }

            const list = await readList(fileName);
            const num = parseInt(quantity) || 1;
            const modifier = command === 'add' ? 1 : -1;

            if (list[elem]) {
                list[elem] += num * modifier;
            } else if (command === 'add') {
                list[elem] = num;
            }

            if (list[elem] <= 0) {
                delete list[elem];
            }

            await writeList(fileName, list);
            console.log(`Updated ${elem} in ${fileName}`);
            break;

        case 'ls':
            const listToDisplay = await readList(fileName);
            printList(listToDisplay);
            break;

        case 'help':
            printHelp();
            break;

        default:
            console.log('Unknown command. Use "help" to see available commands.');
    }
};

main().catch(console.error);