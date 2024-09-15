async function getJSON(path, params = {}) {
  const url = new URL(path);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const jsonData = await response.json();

  if (jsonData.error) {
    throw new Error(jsonData.error);
  }

  if (jsonData.data !== undefined) {
    return jsonData.data;
  }

  throw new Error('Invalid response format');
}