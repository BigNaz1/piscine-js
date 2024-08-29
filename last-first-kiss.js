export function first(collection) {
    return collection[0];
  }
  
  export function last(collection) {
    return collection[collection.length - 1];
  }
  
  export function kiss(collection) {
    return [last(collection), first(collection)];
  }