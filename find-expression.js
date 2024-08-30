export function findExpression(num) {
    function search(current, target, expression) {
      if (current === target) {
        return expression;
      }
      if (current > target) {
        return undefined;
      }
      
      const addResult = search(current + 4, target, expression + " " + add4);
      if (addResult) return addResult;
      
      const mulResult = search(current * 2, target, expression + " " + mul2);
      if (mulResult) return mulResult;
      
      return undefined;
    }
  
    const result = search(1, num, "1");
    if (result) {
      return result.replace(/ /g, " ");
    }
    return undefined;
  }