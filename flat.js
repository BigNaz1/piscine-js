export function flat(arr, depth = 1) {
    function flattenHelper(array, currentDepth) {
      return array.reduce((acc, item) => {
        if (Array.isArray(item) && currentDepth > 0) {
          acc.push(...flattenHelper(item, currentDepth - 1));
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    }
  
    return flattenHelper(arr, depth);
  }