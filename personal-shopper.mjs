import { readFile, writeFile, unlink } from 'fs/promises';

const [,, file, cmd, elem, qtyStr] = process.argv;
const ENCODING = 'utf8';

const HELP_MESSAGE = `Commands:
- create: create a file (usage: create <filename>)
- delete: delete a file (usage: delete <filename>)
- add: add element (usage: add <element> [quantity])
- rm: remove element (usage: rm <element> [quantity])
- ls: list elements
- help: show this help message`;

const printHelp = () => console.log(HELP_MESSAGE);

const readData = async (file) => {
  try {
    return JSON.parse(await readFile(file, ENCODING));
  } catch (e) {
    return e.code === 'ENOENT' ? {} : Promise.reject(e);
  }
};

const writeData = (file, data) => writeFile(file, JSON.stringify(data, null, 2), ENCODING);

const updateElement = async (file, elem, qty) => {
  const data = await readData(file);
  if (qty === null) {
    delete data[elem];
  } else {
    data[elem] = (data[elem] || 0) + qty;
    if (data[elem] <= 0) delete data[elem];
  }
  await writeData(file, data);
};

const listElements = async (file) => {
  const data = await readData(file);
  const entries = Object.entries(data);
  entries.length 
    ? entries.forEach(([k, v]) => console.log(`- ${k} (${v})`))
    : console.log('Empty list.');
};

const processCommand = async () => {
  if (!file || !cmd || cmd === 'help') return printHelp();

  try {
    switch (cmd) {
      case 'create':
        await writeData(file, {});
        break;
      case 'delete':
        await unlink(file);
        break;
      case 'ls':
        await listElements(file);
        break;
      case 'add':
      case 'rm':
        if (!elem) throw new Error('No elem specified.');
        let qty = qtyStr === undefined ? null : parseInt(qtyStr);
        if (qty === null) {
          if (cmd === 'add') qty = 1;
          else if (cmd === 'rm') return await updateElement(file, elem, null);
        }
        if (isNaN(qty)) {
          if (cmd === 'rm') throw new Error('Unexpected request: nothing has been removed.');
          qty = 1;
        }
        qty = (qty < 0) ? (cmd === 'add' ? qty : -qty) : (cmd === 'rm' ? -qty : qty);
        await updateElement(file, elem, qty);
        break;
      default:
        throw new Error('Unknown command. Use "help" to see available commands.');
    }
  } catch (e) {
    console.error(e.message);
  }
};

processCommand();