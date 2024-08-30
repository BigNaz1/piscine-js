function extractURLs(dataSet) {
    const urlRegex = /https?:\/\/[^\s]+/g;
    return dataSet.match(urlRegex) || [];
  }
  
  function countQueryParams(url) {
    const queryString = url.split('?')[1];
    if (!queryString) return 0;
    return queryString.split('&').length;
  }
  
  export function getURL(dataSet) {
    return extractURLs(dataSet);
  }
  
  export function greedyQuery(dataSet) {
    return extractURLs(dataSet).filter(url => countQueryParams(url) >= 3);
  }
  
  export function notSoGreedy(dataSet) {
    return extractURLs(dataSet).filter(url => {
      const paramCount = countQueryParams(url);
      return paramCount >= 2 && paramCount <= 3;
    });
  }