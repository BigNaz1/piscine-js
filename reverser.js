export function reverse(input) {
    const isString = typeof input === 'string';
    const arr = isString ? Array.from(input) : input;
    
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
      const temp = arr[i];
      arr[i] = arr[arr.length - 1 - i];
      arr[arr.length - 1 - i] = temp;
    }
    
    return isString ? arr.join('') : arr;
  }