import fs from 'fs/promises';
import path from 'path';

const commands = {
  create: createFile,
  delete: deleteFile,
  add: addItem,
  rm: removeItem,
  help: showHelp,
  ls: listItems
};

async function main() {
  const [,, filename, command, ...args] = process.argv;

  if (!filename || !command) {
    return showHelp();
  }

  if (!commands[command]) {
    console.error(`Unknown command: ${command}`);
    return showHelp();
  }

  try {
    await commands[command](filename, ...args);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function createFile(filename) {
  if (path.extname(filename) !== '.json') {
    throw new Error('File must have .json extension');
  }
  await fs.writeFile(filename, '{}');
  console.log(`File ${filename} created successfully.`);
}

async function deleteFile(filename) {
  await fs.unlink(filename);
  console.log(`File ${filename} deleted successfully.`);
}

async function addItem(filename, item, quantity = '1') {
  if (!item) {
    throw new Error('No elem specified.');
  }

  const list = await readList(filename);
  const parsedQuantity = parseInt(quantity);

  if (isNaN(parsedQuantity)) {
    list[item] = (list[item] || 0) + 1;
  } else if (parsedQuantity < 0) {
    await removeItem(filename, item, (-parsedQuantity).toString());
    return;
  } else {
    list[item] = (list[item] || 0) + parsedQuantity;
  }

  await writeList(filename, list);
  console.log(`Added ${quantity} ${item}(s) to the list.`);
}

async function removeItem(filename, item, quantity) {
  if (!item) {
    throw new Error('No elem specified.');
  }

  const list = await readList(filename);

  if (!(item in list)) {
    return;
  }

  if (!quantity) {
    delete list[item];
  } else {
    const parsedQuantity = parseInt(quantity);
    if (isNaN(parsedQuantity)) {
      throw new Error('Unexpected request: nothing has been removed.');
    } else if (parsedQuantity < 0) {
      await addItem(filename, item, (-parsedQuantity).toString());
      return;
    } else {
      list[item] -= parsedQuantity;
      if (list[item] <= 0) {
        delete list[item];
      }
    }
  }

  await writeList(filename, list);
  console.log(`Removed ${quantity || 'all'} ${item}(s) from the list.`);
}

function showHelp() {
  console.log('Commands:');
  console.log('- create: takes a filename as argument and create it (should have `.json` extension specified)');
  console.log('- delete: takes a filename as argument and delete it');
  console.log('- add: adds a new element to the list or updates an existing one');
  console.log('- rm: removes an element from the list or reduces its quantity');
  console.log('- help: shows this help message');
  console.log('- ls: lists all items in the shopping list');
}

async function listItems(filename) {
  const list = await readList(filename);
  if (Object.keys(list).length === 0) {
    console.log('Empty list.');
  } else {
    for (const [item, quantity] of Object.entries(list)) {
      console.log(`- ${item} (${quantity})`);
    }
  }
}

async function readList(filename) {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

async function writeList(filename, list) {
  await fs.writeFile(filename, JSON.stringify(list, null, 2));
}

main().catch(console.error);