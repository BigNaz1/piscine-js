import fs from 'fs/promises';
import path from 'path';

async function main() {
  const [,, guestDir, shoppingListFile] = process.argv;

  if (!guestDir || !shoppingListFile) {
    console.error('Please provide a guest directory and a shopping list file.');
    process.exit(1);
  }

  try {
    const guests = await processGuestResponses(guestDir);
    if (guests.length === 0) {
      console.log('No one is coming.');
      return;
    }

    const shoppingList = calculateShoppingList(guests);
    await updateShoppingListFile(shoppingListFile, shoppingList);
    console.log('Shopping list updated successfully.');
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

async function processGuestResponses(directory) {
  const files = await fs.readdir(directory);
  const guests = [];

  for (const file of files) {
    if (path.extname(file) === '.json') {
      const filePath = path.join(directory, file);
      const data = await fs.readFile(filePath, 'utf8');
      const guest = JSON.parse(data);
      if (guest.answer === 'yes') {
        guests.push(guest);
      }
    }
  }

  return guests;
}

function calculateShoppingList(guests) {
  const list = {};
  const totalGuests = guests.length;

  // Drinks
  const beerDrinkers = guests.filter(g => g.drink === 'beer').length;
  const wineDrinkers = guests.filter(g => g.drink === 'wine').length;
  const waterDrinkers = guests.filter(g => g.drink === 'water').length;
  const softDrinkers = guests.filter(g => g.drink === 'soft').length;

  if (beerDrinkers > 0) list['6-packs-beers'] = Math.ceil(beerDrinkers / 6);
  if (wineDrinkers > 0) list['wine-bottles'] = Math.ceil(wineDrinkers / 4);
  if (waterDrinkers > 0) list['water-bottles'] = Math.ceil(waterDrinkers / 4);
  if (softDrinkers > 0) list['soft-bottles'] = Math.ceil(softDrinkers / 4);

  // Food
  const veggieVeganGuests = guests.filter(g => ['veggie', 'vegan'].includes(g.food)).length;
  const carnivores = guests.filter(g => g.food === 'carnivore').length;
  const fishLovers = guests.filter(g => g.food === 'fish').length;
  const omnivores = guests.filter(g => g.food === 'omnivore').length;

  if (veggieVeganGuests > 0) {
    const veggieCount = Math.ceil(veggieVeganGuests / 3);
    list['eggplants'] = veggieCount;
    list['courgettes'] = veggieCount;
    list['mushrooms'] = veggieCount * 3;
    list['hummus'] = veggieCount;
  }

  if (carnivores > 0) list['burgers'] = carnivores;
  if (fishLovers > 0) list['sardines'] = fishLovers;
  if (omnivores > 0) list['kebabs'] = omnivores;

  list['potatoes'] = totalGuests;

  return list;
}

async function updateShoppingListFile(filename, newData) {
  let existingData = {};
  try {
    const fileContent = await fs.readFile(filename, 'utf8');
    existingData = JSON.parse(fileContent);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const updatedData = { ...existingData, ...newData };
  await fs.writeFile(filename, JSON.stringify(updatedData, null, 2));
}

main().catch(console.error);