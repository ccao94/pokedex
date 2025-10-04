const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) return { error: "Network error" };
  return res.json();
}

export async function searchPokemon(name) {
  try {
    const data = await fetchJson(`${BASE_URL}${name.toLowerCase()}`);
    return data;
  } catch {
    return { error: "Pokemon not found" };
  }
}

export async function getPokemonById(id) {
  try {
    const data = await fetchJson(`${BASE_URL}${id}`);
    return data;
  } catch {
    return { error: "Pokemon not found" };
  }
}
