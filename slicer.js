export function slice(collection, start, end) {
    if (typeof collection !== 'string' && !Array.isArray(collection)) {
      return collection;
    }
  
    const length = collection.length;
    start = start === undefined ? 0 : start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
    end = end === undefined ? length : end < 0 ? Math.max(length + end, 0) : Math.min(end, length);
  
    if (start > end) {
      return typeof collection === 'string' ? '' : [];
    }
  
    let result = typeof collection === 'string' ? '' : [];
  
    for (let i = start; i < end; i++) {
      if (typeof collection === 'string') {
        result += collection[i];
      } else {
        result.push(collection[i]);
      }
    }
  
    return result;
  }