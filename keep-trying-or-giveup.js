function retry(count, callback) {
  return async (...args) => {
    let attempts = 0;
    while (true) {
      try {
        return await callback(...args);
      } catch (error) {
        attempts++;
        if (attempts > count) {
          return await callback(...args); // One last attempt
        }
      }
    }
  };
}

function timeout(delay, callback) {
  return async (...args) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('timeout')), delay);
    });

    try {
      return await Promise.race([callback(...args), timeoutPromise]);
    } catch (error) {
      if (error.message === 'timeout') {
        return error;
      }
      throw error;
    }
  };
}