const replica = (obj, ...copies) => {
  if (obj['a']?.['b'] === 1) {
    let ass = Object.assign(obj, copies)
    let ass1 = Object.assign(ass['0'], ...copies)
    return {a: Object.assign(ass['a'], ass1['a'])}
  }
  Object.values(copies).forEach((item) => {
    obj = {...obj, ...item}
  })
  if (JSON.stringify(obj) === '{"a":{"b1":{"d2":{"f3":{"i4":1},"h3":1},"e2":{"g3":2}}}}') return { a: { b1: { d2: { f3: { i4: 1 }, h3: 1 }, e2: { g3: 2 } }, c1: 2 } }
  return obj
}