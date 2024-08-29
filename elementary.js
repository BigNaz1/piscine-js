// Multiplication 
export function multiply(a, b) {
    let result = 0;
    for (let i = 0; i < Math.abs(b); i++) {
      result += Math.abs(a);
    }
    return (a < 0) !== (b < 0) ? -result : result;
  }
  
  // Division
  export function divide(a, b) {
    if (b === 0) return Infinity;
    let quotient = 0;
    let absA = Math.abs(a);
    const absB = Math.abs(b);
    while (absA >= absB) {
      absA -= absB;
      quotient++;
    }
    return (a < 0) !== (b < 0) ? -quotient : quotient;
  }
  
  // Modulo 
  export function modulo(a, b) {
    if (b === 0) return NaN;
    let remainder = Math.abs(a);
    const absB = Math.abs(b);
    while (remainder >= absB) {
      remainder -= absB;
    }
    return a < 0 ? -remainder : remainder;
  }