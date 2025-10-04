import React, { useState } from "react"
import SearchBar from "../components/SearchBar"
import HeroCarousel from "../components/HeroCarousel"
import PokemonCard from "../components/PokemonCard"
import { searchPokemon } from "../api/pokemon"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [searchResult, setSearchResult] = useState(null)
  const [status, setStatus] = useState("idle")
  const navigate = useNavigate()

  async function handleSearch(q) {
    setStatus("loading")
    try {
      const data = await searchPokemon(q)
      if (data && !data.error) {
        setSearchResult(data)
        setStatus("done")
      } else {
        setSearchResult(null)
        setStatus("error")
      }
    } catch {
      setSearchResult(null)
      setStatus("error")
    }
  }

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#4a565e" }}>
      <h1 className="text-center text-5xl font-bold mb-2">Pokedex</h1>
      <p className="text-center mb-6 text-white drop-shadow-lg">
        Discover your favorite Pokémon and explore their stats, types, and moves!
      </p>
      <SearchBar onSearch={handleSearch} />

      {status === "loading" && <div className="text-center py-4">Loading...</div>}
      {status === "error" && <div className="text-center py-4 text-red-600">Pokémon not found</div>}

      {searchResult && (
        <div className="flex justify-center mt-8 mb-8">
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/pokemon/${searchResult.name}`, { state: { pokemon: searchResult } })}
          >
            <PokemonCard pokemon={searchResult} />
          </div>
        </div>
      )}

      <HeroCarousel />
    </div>
  )
}
