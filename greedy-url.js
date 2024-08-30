export function getURL(dataSet) {
    const urlRegex = /https?:\/\/\S+/g;
    return dataSet.match(urlRegex) || [];
  }
  
  export function greedyQuery(dataSet) {
    const greedyRegex = /https?:\/\/\S+\?\S+(?:&\S+){2,}/g;
    return dataSet.match(greedyRegex) || [];
  }
  
  export function notSoGreedy(dataSet) {
    const notSoGreedyRegex = /https?:\/\/\S+?\?(?:[^&\s]+=[^&\s]+)(?:&[^&\s]+=[^&\s]+){1,2}(?!&\S)/g;
    return dataSet.match(notSoGreedyRegex) || [];
  }