// const defaultCurry = (a) => (b) => ({ ...a, ...b });

// const mapCurry = (func) => (obj) => Object.fromEntries(Object.entries(obj).map(([key, value]) => [func([key, value])[0], func([key, value])[1]]));

// const reduceCurry = (func) => (obj, initial) => Object.keys(obj).reduce((pKey, key) => func(pKey, [key, obj[key]]), initial);

// const filterCurry = (func) => (obj) => Object.fromEntries(Object.entries(obj).filter(([key, value]) => func([key, value])));

// const reduceScore = (obj, start) => {
//     const result = Object.fromEntries(Object.entries(obj).filter(([key, value]) => value.isForceUser));
//     const total = start !== undefined ? start : 0;
//     return reduceCurry((key, nextKey) => key + result[nextKey[0]].pilotingScore + result[nextKey[0]].shootingScore)(result, total);
// };

// const filterForce = (obj) => filterCurry(([key, value]) => value.isForceUser && value.shootingScore >= 80)(obj);

// const mapAverage = (obj) => Object.fromEntries(Object.entries(obj).map(([nestedObj, nestedValue]) => [
//     nestedObj,
//     { ...mapCurry(x => ['averageScore', (nestedValue.pilotingScore + nestedValue.shootingScore) / 2])(nestedObj), ...nestedValue }
// ]));


const defaultCurry = (obj1) => {
  return function (obj) {
    if (Object.isFrozen(obj1)) return obj
    return Object.assign(obj1, obj)
  }
}
const mapCurry = (func) => (obj) => Object.fromEntries(Object.entries(obj).map(func))
const reduceCurry = (func) => (obj, iv) => Object.entries(obj).reduce(func, iv)
const filterCurry = (func) => (obj) => Object.fromEntries(Object.entries(obj).filter(func))

const forceUsers = filterCurry(([k, v]) => v.isForceUser)
const reduceScore = (obj, iv) => reduceCurry((acc, [k, v]) => acc + v.shootingScore + v.pilotingScore)(forceUsers(obj), iv)
const filterForce = (obj) => filterCurry(([k, v]) => v.shootingScore >= 80)(forceUsers(obj))
const mapAverage = (obj) => mapCurry(([k, v]) => {
  let nv = {...v, averageScore: (v.shootingScore + v.pilotingScore) / 2}
  return [k, nv]
})(obj)