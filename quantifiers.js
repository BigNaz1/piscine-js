function every(array, func) {
    for (let i = 0; i < array.length; i++) {
      if (!func(array[i])) return false
    }
    return true
  }
  
  function some(array, func) {
    for (let i = 0; i < array.length; i++) {
      if (func(array[i])) return true
    }
    return false
  }
  
  function none(array, func) {
    for (let i = 0; i < array.length; i++) {
      if (func(array[i])) return false
    }
    return true
  }