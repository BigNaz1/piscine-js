function getURL(dataSet) {
    const urlPattern = /https?:\/\/[^\s]+/g;
    return dataSet.match(urlPattern) || [];
}

function greedyQuery(dataSet) {
    const greedyPattern = /https?:\/\/[^\s\?#]+(\?[^#\s]*&[^#\s]*&[^#\s]*&[^\s#]*)/g;
    return dataSet.match(greedyPattern) || [];
}

function notSoGreedy(dataSet) {
    const notSoGreedyPattern = /https?:\/\/[^\s\?#]+(\?[^#\s]*&[^#\s]*&[^#\s]*)(?![^#\s]*&)/g;
    return dataSet.match(notSoGreedyPattern) || [];
}