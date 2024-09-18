import { readdir, readFile, writeFile, stat } from 'fs/promises';
import { join } from 'path';

const [,, guestDir, outputFile] = process.argv;

if (!guestDir || !outputFile) {
  console.error('Usage: node happiness-manager.mjs <guest_directory> <output_file.json>');
  process.exit(1);
}

(async () => {
  try {
    const guestFiles = await readdir(guestDir);
    const vipGuests = [];

    for (const file of guestFiles) {
      if (file.endsWith('.json')) {
        const filePath = join(guestDir, file);
        const content = await readFile(filePath, 'utf8');
        const data = JSON.parse(content);
        if (data.answer && data.answer.toLowerCase() === 'yes') {
          vipGuests.push(data);
        }
      }
    }

    if (vipGuests.length === 0) {
      console.log('No one is coming.');
      process.exit(0);
    }

    const drinksCount = {
      beers: 0,
      water: 0,
      wine: 0,
      softs: 0,
    };
    const foodCount = {
      veggiesVegans: 0,
      carnivores: 0,
      fishLovers: 0,
      omnivores: 0,
    };

    for (const guest of vipGuests) {
      if (guest.drink) {
        switch (guest.drink.toLowerCase()) {
          case 'beer':
          case 'beers':
            drinksCount.beers += 1;
            break;
          case 'water':
            drinksCount.water += 1;
            break;
          case 'wine':
            drinksCount.wine += 1;
            break;
          case 'soft':
          case 'softs':
            drinksCount.softs += 1;
            break;
        }
      }
      if (guest.food) {
        switch (guest.food.toLowerCase()) {
          case 'vegan':
          case 'veggie':
          case 'vegetarian':
            foodCount.veggiesVegans += 1;
            break;
          case 'carnivore':
            foodCount.carnivores += 1;
            break;
          case 'fish':
          case 'fish lover':
            foodCount.fishLovers += 1;
            break;
          case 'omnivore':
          case 'everything':
            foodCount.omnivores += 1;
            break;
        }
      }
    }

    const shoppingList = {};

    if (drinksCount.beers > 0) {
      const packs = Math.ceil(drinksCount.beers / 6);
      shoppingList['6-packs-beers'] = packs;
    }
    if (drinksCount.water > 0) {
      const bottles = Math.ceil(drinksCount.water / 4);
      shoppingList['water-bottles'] = bottles;
    }
    if (drinksCount.wine > 0) {
      const bottles = Math.ceil(drinksCount.wine / 4);
      shoppingList['wine-bottles'] = bottles;
    }
    if (drinksCount.softs > 0) {
      const bottles = Math.ceil(drinksCount.softs / 4);
      shoppingList['soft-bottles'] = bottles;
    }

    const veggieTotal = foodCount.veggiesVegans;
    if (veggieTotal > 0) {
      const groups = Math.ceil(veggieTotal / 3);
      shoppingList['eggplants'] = groups;
      shoppingList['courgettes'] = groups;
      shoppingList['hummus'] = groups;
      shoppingList['mushrooms'] = veggieTotal;
    }
    if (foodCount.carnivores > 0) {
      shoppingList['burgers'] = foodCount.carnivores;
    }
    if (foodCount.fishLovers > 0) {
      shoppingList['sardines'] = foodCount.fishLovers;
    }
    if (foodCount.omnivores > 0) {
      shoppingList['kebabs'] = foodCount.omnivores;
    }

    const totalGuests = vipGuests.length;
    if (totalGuests > 0) {
      shoppingList['potatoes'] = totalGuests;
    }

    let existingData = {};
    try {
      await stat(outputFile);
      const existingContent = await readFile(outputFile, 'utf8');
      existingData = JSON.parse(existingContent);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    const updatedData = { ...existingData, ...shoppingList };

    await writeFile(outputFile, JSON.stringify(updatedData, null, 2));
    console.log('Shopping list updated successfully.');
  } catch (error) {
    console.error('An error occurred:', error.message);
    process.exit(1);
  }
})();