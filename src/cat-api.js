const API_KEY =
  'live_FG97laJVZogW3F3rEViScxr8Bb0S4cVPRgFq8fQ5mhw5Jkp8Skb5oKFhPmN4nl3V';
const url = 'https://api.thecatapi.com/v1/breeds';
const options = {
  headers: {
    'x-api-key': API_KEY,
  },
};

export function fetchBreeds() {
  return fetch(url, options).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
}
export function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`,
    options
  ).then(r => {
    if (!r.ok) {
      throw new Error(r.status);
    }
    return r.json();
  });
}
