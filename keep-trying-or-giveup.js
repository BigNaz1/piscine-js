function retry(count = 3, callback = async () => {}) {
    return async function (...args) {
        for (let i = 0; i <= count; i++) {
            try {
                const res = await callback(...args);
                return res;
            } catch (e) {
                if (i === count) {
                    throw e;
                }
            }
        }
    };
}

function timeout(delay = 0, callback = async () => {}) {
    return async function (...args) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error('timeout'));
            }, delay);

            callback(...args)
                .then((result) => {
                    clearTimeout(timer);
                    resolve(result);
                })
                .catch((error) => {
                    clearTimeout(timer);
                    reject(error);
                });
        });
    };
}