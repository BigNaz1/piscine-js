function map(arr, fn) {
    let result = []
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i], i, arr))
    }
    return result
  }
  
  function flatMap(arr, fn) {
    return arr.reduce((acc, val, i, arr) => acc.concat(fn(val, i, arr)), [])
  }