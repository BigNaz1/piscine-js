export function sums(n) {
    function generatePartitions(target, max, current = []) {
      if (target === 0) {
        return [current];
      }
      
      let results = [];
      for (let i = Math.min(max, target); i >= 1; i--) {
        results = results.concat(generatePartitions(target - i, i, [...current, i]));
      }
      return results;
    }
  
    return generatePartitions(n, n).sort((a, b) => {
      for (let i = 0; i < Math.max(a.length, b.length); i++) {
        if (a[i] !== b[i]) {
          return a[i] - b[i];
        }
      }
      return 0;
    });
  }