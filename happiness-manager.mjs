import fs from 'fs/promises';
import path from 'path';

const [,, guestDir, shoppingListFile] = process.argv;

const readJsonFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') return null;
        throw error;
    }
};

const writeJsonFile = async (filePath, data) => {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

const roundUp = (num, divisor) => Math.ceil(num / divisor);

const processGuests = async (dir) => {
    const files = await fs.readdir(dir);
    const guests = await Promise.all(
        files.map(file => readJsonFile(path.join(dir, file)))
    );
    return guests.filter(guest => guest && guest.answer === 'yes');
};

const categorizePreferences = (guests) => {
    const prefs = { drinks: {}, food: {} };
    guests.forEach(guest => {
        if (guest.drink) prefs.drinks[guest.drink] = (prefs.drinks[guest.drink] || 0) + 1;
        if (guest.food) prefs.food[guest.food] = (prefs.food[guest.food] || 0) + 1;
    });
    return prefs;
};

const calculateShoppingList = (prefs) => {
    const list = {};
    const totalGuests = Object.values(prefs.food).reduce((sum, count) => sum + count, 0);

    // Drinks
    if (prefs.drinks.beer) list['6-packs-beers'] = roundUp(prefs.drinks.beer, 6);
    if (prefs.drinks.wine) list['wine-bottles'] = roundUp(prefs.drinks.wine, 4);
    if (prefs.drinks.water) list['water-bottles'] = roundUp(prefs.drinks.water, 4);
    if (prefs.drinks.soft) list['soft-bottles'] = roundUp(prefs.drinks.soft, 4);

    // Food
    const veggieVeganCount = (prefs.food.veggie || 0) + (prefs.food.vegan || 0);
    if (veggieVeganCount > 0) {
        const veggieVeganPacks = roundUp(veggieVeganCount, 3);
        list.eggplants = veggieVeganPacks;
        list.courgettes = veggieVeganPacks;
        list.mushrooms = veggieVeganPacks * 3;
        list.hummus = veggieVeganPacks;
    }

    if (prefs.food.meat) list.burgers = prefs.food.meat;
    if (prefs.food.fish) list.sardines = prefs.food.fish;
    if (prefs.food.omnivore) list.kebabs = prefs.food.omnivore;

    list.potatoes = totalGuests;

    return list;
};

const updateShoppingList = async (file, newList) => {
    const existingList = await readJsonFile(file) || {};
    const updatedList = { ...existingList, ...newList };
    await writeJsonFile(file, updatedList);
};

const main = async () => {
    try {
        const vipGuests = await processGuests(guestDir);

        if (vipGuests.length === 0) {
            console.log('No one is coming.');
            return;
        }

        const preferences = categorizePreferences(vipGuests);
        const shoppingList = calculateShoppingList(preferences);
        await updateShoppingList(shoppingListFile, shoppingList);

        console.log('Shopping list updated successfully.');
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

main();