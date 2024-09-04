const adder = (arr, initial = 0) => arr.reduce((sum, num) => sum + num, initial);

const sumOrMul = (arr, initial) => {
  if (initial !== undefined) {
    return arr.reduce((result, num) => 
      num % 2 === 0 ? result * num : result + num, 
      initial
    );
  } else {
    return arr.slice(1).reduce((result, num) => 
      num % 2 === 0 ? result * num : result + num, 
      arr[0]
    );
  }
};

const funcExec = (arr, initial) => arr.reduce((result, func) => func(result), initial);