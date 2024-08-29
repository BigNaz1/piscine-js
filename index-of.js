// indexOf
export function indexOf(arr, val, fromIndex = 0) {
    const len = arr.length;
    const start = fromIndex >= 0 ? fromIndex : Math.max(len + fromIndex, 0);
    
    for (let i = start; i < len; i++) {
      if (arr[i] === val) {
        return i;
      }
    }
    return -1;
  }
  
  // lastIndexOf
  export function lastIndexOf(arr, val, fromIndex = arr.length - 1) {
    const len = arr.length;
    const start = fromIndex >= 0 ? Math.min(fromIndex, len - 1) : len + fromIndex;
    
    for (let i = start; i >= 0; i--) {
      if (arr[i] === val) {
        return i;
      }
    }
    return -1;
  }
  
  // includes
  export function includes(arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        return true;
      }
    }
    return false;
  }