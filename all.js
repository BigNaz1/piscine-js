function all(obj) {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(obj);
        const results = {};
        let completedPromises = 0;

        if (keys.length === 0) {
            resolve(results);
            return;
        }

        keys.forEach(key => {
            Promise.resolve(obj[key])
                .then(value => {
                    results[key] = value;
                    completedPromises++;

                    if (completedPromises === keys.length) {
                        resolve(results);
                    }
                })
                .catch(reject);
        });
    });
}