async function queryServers(serverName, q) {
    const urls = [
        `/${serverName}?q=${q}`,
        `/${serverName}_backup?q=${q}`
    ];
    
    return Promise.race(urls.map(getJSON));
}

async function gougleSearch(q) {
    const servers = ['web', 'image', 'video'];
    
    const searchPromise = Promise.all(
        servers.map(async (server) => {
            const result = await queryServers(server, q);
            return [server, result];
        })
    ).then(Object.fromEntries);

    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), 80);
    });

    try {
        return await Promise.race([searchPromise, timeoutPromise]);
    } catch (error) {
        if (error.message === 'timeout') {
            throw error;
        }
        // Handle other potential errors
        console.error('An error occurred:', error);
        throw error;
    }
}