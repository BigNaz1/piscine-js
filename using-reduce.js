const adder = (arr, initial = 0) => arr.reduce((sum, num) => sum + num, initial);

const sumOrMul = (arr, initial) => arr.reduce((result, num) => 
  num % 2 === 0 ? result * num : result + num, 
  initial !== undefined ? initial : arr[0]
);

const funcExec = (arr, initial) => arr.reduce((result, func) => func(result), initial);