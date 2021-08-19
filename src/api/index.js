const host = "https://www.omdbapi.com/";
const apiKey = "b9bd48a6";

export const endpoint = `${host}?apikey=${apiKey}`;

async function apiCall(params) {
  const request = new Request(endpoint + params);
  const response = await fetch(request, { method: "GET" });
  const data = await response.json();
  if (data?.Response === "False") {
    return Promise.reject(data.Error);
  }
  return data;
}

export function apiGetMovies(query) {
  return apiCall(`&type=movie&s=${query}`);
}
