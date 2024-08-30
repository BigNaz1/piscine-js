export function get(src, path) {
    const keys = path.split('.');
    let result = src;
    
    for (const key of keys) {
      if (result == null) {
        return undefined;
      }
      
      if (typeof result[key] === 'function') {
        return result[key].bind(result);
      }
      
      result = result[key];
    }
    
    return result;
  }