export function round(number) {
    return number >= 0 ? floor(number + 0.5) : ceil(number - 0.5);
  }
  
  export function ceil(number) {
    const integer = trunc(number);
    return number > integer ? integer + 1 : integer;
  }
  
  export function floor(number) {
    const integer = trunc(number);
    return number < integer ? integer - 1 : integer;
  }
  
  export function trunc(number) {
    if (number === 0) return 0;
    if (number < 0) return -trunc(-number);
    
    let exp = 0;
    while (10 ** exp <= number) {
      exp++;
    }
    
    let result = 0;
    for (let i = exp - 1; i >= 0; i--) {
      const base = 10 ** i;
      while (result + base <= number) {
        result += base;
      }
    }
    
    return result;
  }