import React, { useEffect, useState } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import Loading from "../components/Loading"

const typeIcons = {
  normal: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/normal.svg",
  fire: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fire.svg",
  water: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/water.svg",
  grass: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/grass.svg",
  electric: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/electric.svg",
  ice: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ice.svg",
  fighting: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fighting.svg",
  poison: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/poison.svg",
  ground: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ground.svg",
  flying: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/flying.svg",
  psychic: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/psychic.svg",
  bug: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/bug.svg",
  rock: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/rock.svg",
  ghost: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ghost.svg",
  dragon: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dragon.svg",
  dark: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dark.svg",
  steel: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/steel.svg",
  fairy: "https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fairy.svg",
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
  if (status === "error") return <div className="p-4">Pokémon not found.</div>

  const description =
    species?.flavor_text_entries
      ?.find((e) => e.language.name === "en")
      ?.flavor_text.replace(/[\n\f]/g, " ") || "No description available."

  const bgColor = colorMap[species?.color?.name] || "bg-gray-200"

  return (
    <div className="p-6">
      <button onClick={() => nav(-1)} className="px-3 py-1 border rounded-lg mb-6 hover:bg-gray-200 dark:hover:bg-gray-700">
        ← Back
      </button>
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className={`rounded-full ${bgColor} flex items-center justify-center w-96 h-96 mx-auto`}>
          <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} className="w-72 h-72 object-contain" />
        </div>
        <div>
          <h2 className="text-4xl font-bold capitalize mb-4">
            {pokemon.name} <span className="text-gray-400">#{pokemon.id}</span>
          </h2>
          <p className="mb-4 text-lg">{description}</p>
          <div className="mb-4 flex gap-3 flex-wrap">
            {pokemon.types.map((t) => (
              <div key={t.type.name} className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm">
                <img src={typeIcons[t.type.name]} alt={t.type.name} className="w-5 h-5" />
                <span className="capitalize">{t.type.name}</span>
              </div>
            ))}
          </div>
          <p className="mb-2"><strong>Height:</strong> {pokemon.height / 10} m</p>
          <p className="mb-2"><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
          <p className="mb-2"><strong>Abilities:</strong> {pokemon.abilities.map((a) => a.ability.name).join(", ")}</p>
          <p><strong>Main Moves:</strong> {pokemon.moves.slice(0, 6).map((m) => m.move.name).join(", ")}</p>
        </div>
      </div>
    </div>
  )
}
