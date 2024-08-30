export function ionOut(str) {
    const regex = /\b(\w+t)ion\b/g;
    return (str.match(regex) || []).map(word => word.slice(0, -3));
  }