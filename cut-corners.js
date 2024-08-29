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
    return number < 0 ? -trunc(-number) : number - (number - floor(number));
  }