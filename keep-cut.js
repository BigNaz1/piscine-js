export function cutFirst(str) {
    return str.slice(2);
  }
  
  export function cutLast(str) {
    return str.slice(0, -2);
  }
  
  export function cutFirstLast(str) {
    return str.slice(2, -2);
  }
  
  export function keepFirst(str) {
    return str.slice(0, 2);
  }
  
  export function keepLast(str) {
    return str.slice(-2);
  }
  
  export function keepFirstLast(str) {
    if (str.length <= 3) {
      return str;
    }
    return keepFirst(str) + keepLast(str);
  }