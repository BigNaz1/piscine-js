export function groupPrice(str) {
    const regex = /(\$|£|€)(\d+)\.(\d{2})|USD(\d+)\.(\d{2})/g;
    const results = [];
    let match;
  
    while ((match = regex.exec(str)) !== null) {
      if (match[1]) {  // For $, £, € prices
        results.push([match[0], match[2], match[3]]);
      } else {  // For USD prices
        results.push([match[0], match[4], match[5]]);
      }
    }
  
    return results;
  }