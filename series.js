async function series(asyncFunctions) {
    const results = [];
    
    for (const asyncFunc of asyncFunctions) {
        try {
            const result = await asyncFunc();
            results.push(result);
        } catch (error) {
            throw error;
        }
    }
    
    return results;
}