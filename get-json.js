async function getJSON(path = '', params = {}) {
    const queryString = Object.entries(params)
        .map(([key, value]) => 
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&');
    
    const url = queryString ? `${path}?${queryString}` : path;

    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const res = await response.json();

    if (res.error) {
        throw new Error(res.error);
    }

    return res.data;
}