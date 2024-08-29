export function round(number) {
    return number >= 0 ? floor(number + 0.5) : ceil(number - 0.5);
  }
  
  export function ceil(number) {
    const intPart = trunc(number);
    return intPart < number ? intPart + 1 : intPart;
  }
  
  export function floor(number) {
    const intPart = trunc(number);
    return intPart > number ? intPart - 1 : intPart;
  }
  
  export function trunc(number) {
    if (number === 0) return 0;
    if (number < 0) return -trunc(-number);
    
    let result = 0;
    while (result + 1 <= number) {
      result += 1;
    }
    return result;
  }