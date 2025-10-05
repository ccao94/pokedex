import React, { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import Loading from "../components/Loading"

const typeIcons = {
  normal: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/1.png",
  fighting: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/2.png",
  flying: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/3.png",
  poison: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/4.png",
  ground: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/5.png",
  rock: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/6.png",
  bug: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/7.png",
  ghost: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/8.png",
  steel: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/9.png",
  fire: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/10.png",
  water: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/11.png",
  grass: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/12.png",
  electric: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/13.png",
  psychic: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/14.png",
  ice: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/15.png",
  dragon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/16.png",
  dark: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/17.png",
  fairy: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/18.png",
}

const colorMap = {
  black: "bg-gray-800",
  blue: "bg-blue-400",
  brown: "bg-yellow-700",
  gray: "bg-gray-400",
  green: "bg-green-500",
  pink: "bg-pink-400",
  purple: "bg-purple-500",
  red: "bg-red-500",
  white: "bg-gray-200",
  yellow: "bg-yellow-400",
}

export default function PokemonDetails() {
  const { name } = useParams()
  const nav = useNavigate()
  const location = useLocation()
  const [pokemon, setPokemon] = useState(location.state?.pokemon || null)
  const [species, setSpecies] = useState(null)
  const [status, setStatus] = useState(pokemon ? "done" : "loading")

  useEffect(() => {
    async function load() {
      setStatus("loading")
      try {
        let p = pokemon
        if (!p) {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
          p = await res.json()
        }
        setPokemon(p)
        const res2 = await fetch(p.species.url)
        const sp = await res2.json()
        setSpecies(sp)
        setStatus("done")
      } catch {
        setStatus("error")
      }
    }
    load()
  }, [name])

  if (status === "loading") return <Loading />
  if (status === "error") return <div className="p-4 text-[#e5e7eb]">Pokémon not found.</div>

  const description =
    species?.flavor_text_entries
      ?.find((e) => e.language.name === "en")
      ?.flavor_text.replace(/[\n\f]/g, " ") || "No description available."

  const bgColor = colorMap[species?.color?.name] || "bg-gray-200"

  return (
    <div className="p-6 text-[#e5e7eb]">
      <button
        onClick={() => nav(-1)}
        className="px-3 py-1 border border-[#e5e7eb] rounded-lg mb-6 hover:bg-[#ffcb05]/20 text-[#ffcb05] transition"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className={`rounded-full ${bgColor} flex items-center justify-center w-96 h-96 mx-auto shadow-lg`}>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="w-72 h-72 object-contain"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold capitalize mb-4 text-[#ffcb05] drop-shadow">
            {pokemon.name} <span className="text-[#cbd5e1]">#{pokemon.id}</span>
          </h2>

          <p className="mb-4 text-lg text-[#e5e7eb] italic">{description}</p>

          {}
          <div className="mb-4 flex gap-3 flex-wrap">
            {pokemon.types.map((t) => (
              <div
                key={t.type.name}
                className="flex items-center px-3 py-1 rounded-full bg-gray-700/50 text-sm shadow"
              >
                <img
                  src={typeIcons[t.type.name]}
                  alt={t.type.name}
                  className="w-10 h-10"
                />
              </div>
            ))}
          </div>

          <div className="space-y-2 mt-6">
            <p>
              <strong className="text-[#60a5fa]">Height:</strong> {pokemon.height / 10} m
            </p>
            <p>
              <strong className="text-[#60a5fa]">Weight:</strong> {pokemon.weight / 10} kg
            </p>
            <p>
              <strong className="text-[#60a5fa]">Abilities:</strong>{" "}
              {pokemon.abilities.map((a) => a.ability.name).join(", ")}
            </p>
            <p>
              <strong className="text-[#f87171]">Main Moves:</strong>{" "}
              {pokemon.moves.slice(0, 6).map((m) => m.move.name).join(", ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
