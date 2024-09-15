function retry(count = 3, callback = async () => {}) {
    return async function (...args) {
        if (count < 0) throw new Error('Retry count exceeded');
        try {
            return await callback(...args);
        } catch (e) {
            return retry(count - 1, callback)(...args);
        }
    };
}

function timeout(delay = 0, callback = async () => {}) {
    return async function (...args) {
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), delay)
        );
        const res = await Promise.race([timeout, callback(...args)]);
        if (res instanceof Error) throw res;
        return res;
    };
}