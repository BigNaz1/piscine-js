function race(promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            return;
        }
        
        promises.forEach(promise => {
            Promise.resolve(promise).then(resolve).catch(reject);
        });
    });
}

function some(promises, count) {
    return new Promise((resolve) => {
        if (promises.length === 0 || count === 0) {
            resolve([]);
            return;
        }

        const results = new Array(promises.length).fill(undefined);
        let resolvedCount = 0;
        let settledCount = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise)
                .then(value => {
                    if (resolvedCount < count) {
                        results[index] = value;
                        resolvedCount++;
                        if (resolvedCount === count) {
                            resolve(results.slice(0, promises.length));
                        }
                    }
                })
                .catch(() => {})
                .finally(() => {
                    settledCount++;
                    if (settledCount === promises.length && resolvedCount < count) {
                        resolve(results.slice(0, promises.length));
                    }
                });
        });
    });
}