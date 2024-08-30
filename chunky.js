export function chunk(array, size) {
    if (size <= 0) {
      return [];
    }
  
    const result = [];
    let index = 0;
  
    while (index < array.length) {
      result.push(array.slice(index, index + size));
      index += size;
    }
  
    return result;
  }