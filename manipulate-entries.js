const filterEntries = (obj, func) => Object.fromEntries(Object.entries(obj).filter(func));

const mapEntries = (obj, func) => Object.fromEntries(Object.entries(obj).map(entry => [func(entry)[0], func(entry)[1]]));

const reduceEntries = (obj, func, start) => start === undefined ? Object.entries(obj).reduce((acc, [key, value]) => func(acc, [key, value])) : Object.keys(obj).reduce((acc, key) => func(acc, [key, obj[key]]), start);

const totalCalories = (obj) => +(reduceEntries(obj, (prev, [key, value]) => prev + (nutritionDB[key].calories / 100) * value, 0).toFixed(1));

const lowCarbs = (obj) => filterEntries(obj, ([key, value]) => (nutritionDB[key].carbs / 100) * value < 50);

const cartTotal = (obj) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, Object.fromEntries(Object.keys(nutritionDB[key]).map(prop => [prop, +(((nutritionDB[key][prop] / 100) * value).toFixed(3))]))]));


// function filterEntries(obj, callBack) {
//     const entries = Object.entries(obj);
//     return Object.fromEntries(entries.filter(callBack));

// }
// function mapEntries(obj, callBack) {
//     const entries = Object.entries(obj);
//     return Object.fromEntries(entries.map(callBack));
// }
// function reduceEntries(obj, callBack, initialValue) {
//     const entries = Object.entries(obj);
//     if (arguments.length === 2) {
//         return entries.reduce(callBack)
//     }
//     return entries.reduce(callBack, initialValue);
// }

// function totalCalories(products) {
//     return reduceEntries(products, (accCalories, [productName, quantity]) => accCalories + quantity * nutritionDB[productName].calories,0)/100;
// }
// function lowCarbs(products) {
//     return filterEntries(products, ([productName, quantity]) => nutritionDB[productName].carbs * quantity / 100 < 50);
// }
// function cartTotal(products) {
//     return mapEntries(products, ([productName, quantity]) => [productName, mapEntries(nutritionDB[productName], ([nutrition, value]) => [nutrition, Math.round(value /100 * quantity*1000)/1000 ])]);
// }
