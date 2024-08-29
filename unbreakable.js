export function split(str, separator) {
    if (separator === undefined) return [str];
    
    const result = [];
    let startIndex = 0;
    let foundIndex = -1;
  
    if (separator === '') {
      for (let i = 0; i < str.length; i++) {
        result.push(str[i]);
      }
      return result;
    }
  
    for (let i = 0; i <= str.length - separator.length; i++) {
      let match = true;
      for (let j = 0; j < separator.length; j++) {
        if (str[i + j] !== separator[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        result.push(str.substring(startIndex, i));
        startIndex = i + separator.length;
        i = startIndex - 1;
      }
    }
  
    result.push(str.substring(startIndex));
    return result;
  }
  
  export function join(arr, separator = ',') {
    if (arr.length === 0) return '';
  
    let result = '' + arr[0];
    for (let i = 1; i < arr.length; i++) {
      result += separator + arr[i];
    }
  
    return result;
  }