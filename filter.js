function filter(array, func) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (func(array[i], i, array)) {
        result.push(array[i])
      }
    }
    return result
  }
  
  function reject(array, func) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (!func(array[i], i, array)) {
        result.push(array[i])
      }
    }
    return result
  }
  
  function partition(array, func) {
    return [filter(array, func), reject(array, func)]
  }