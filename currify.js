function currify(fn) {
    return function curried(...args) {
        if (args.length === fn.length) {
            return fn(...args);
        } else {
            return function (x) {
                return curried(...args, x);
            }
        }
    }

}


const sub = (el1, el2, el3) => el1 - el2 - el3
console.log(sub(7,1,2))
console.log(currify(sub)(7)(1)(2))