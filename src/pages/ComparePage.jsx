import React, { useEffect, useState, useMemo } from "react"
import PokemonCard from "../components/PokemonCard"

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

export default function ComparePage() {
  const [list, setList] = useState([])
  const [queryLeft, setQueryLeft] = useState("")
  const [queryRight, setQueryRight] = useState("")
  const [leftName, setLeftName] = useState("")
  const [rightName, setRightName] = useState("")
  const [leftData, setLeftData] = useState(null)
  const [rightData, setRightData] = useState(null)

  useEffect(() => {
    async function loadList() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
        const data = await res.json()
        setList(data.results)
      } catch {
        setList([])
      }
    }
    loadList()
  }, [])

  async function loadDetail(name, setter) {
    if (!name) {
      setter(null)
      return
    }
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await res.json()
      setter(data)
    } catch {
      setter(null)
    }
  }

  useEffect(() => {
    loadDetail(leftName, setLeftData)
  }, [leftName])

  useEffect(() => {
    loadDetail(rightName, setRightData)
  }, [rightName])

  const filteredLeft = useMemo(() => list.filter((p) => p.name.toLowerCase().includes(queryLeft.toLowerCase())), [list, queryLeft])
  const filteredRight = useMemo(() => list.filter((p) => p.name.toLowerCase().includes(queryRight.toLowerCase())), [list, queryRight])

  const handleLeftSearch = () => {
    if (filteredLeft.length > 0) setLeftName(filteredLeft[0].name)
  }

  const handleRightSearch = () => {
    if (filteredRight.length > 0) setRightName(filteredRight[0].name)
  }

  const handleKeyDownLeft = (e) => {
    if (e.key === "Enter") handleLeftSearch()
  }

  const handleKeyDownRight = (e) => {
    if (e.key === "Enter") handleRightSearch()
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4 text-yellow-400 drop-shadow-md">Compare</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-1 text-white">Left</label>
          <div className="flex">
            <input
              value={queryLeft}
              onChange={(e) => setQueryLeft(e.target.value)}
              onKeyDown={handleKeyDownLeft}
              placeholder="Search Pokémon"
              className="p-2 rounded-l border w-full text-black focus:ring-2 focus:ring-yellow-300"
            />
            <button
              onClick={handleLeftSearch}
              className="bg-yellow-400 px-3 rounded-r"
            >
              🔍
            </button>
          </div>
          <select onChange={(e) => setLeftName(e.target.value)} value={leftName} className="p-2 rounded border w-full mt-2 text-black">
            <option value="">Select</option>
            {filteredLeft.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-white">Right</label>
          <div className="flex">
            <input
              value={queryRight}
              onChange={(e) => setQueryRight(e.target.value)}
              onKeyDown={handleKeyDownRight}
              placeholder="Search Pokémon"
              className="p-2 rounded-l border w-full text-black focus:ring-2 focus:ring-yellow-300"
            />
            <button
              onClick={handleRightSearch}
              className="bg-yellow-400 px-3 rounded-r"
            >
              🔍
            </button>
          </div>
          <select onChange={(e) => setRightName(e.target.value)} value={rightName} className="p-2 rounded border w-full mt-2 text-black">
            <option value="">Select</option>
            {filteredRight.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col items-center">
          {leftData ? (
            <div className="flex flex-col items-center">
              <PokemonCard pokemon={leftData} />
              <div className="mt-4 w-full">
                <strong>Stats:</strong>
                <ul className="mt-2">
                  {leftData.stats.map((s) => (
                    <li key={s.stat.name}>
                      {s.stat.name}: {s.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Select a Pokémon</div>
          )}
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow flex flex-col items-center">
          {rightData ? (
            <div className="flex flex-col items-center">
              <PokemonCard pokemon={rightData} />
              <div className="mt-4 w-full">
                <strong>Stats:</strong>
                <ul className="mt-2">
                  {rightData.stats.map((s) => (
                    <li key={s.stat.name}>
                      {s.stat.name}: {s.base_stat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-gray-500">Select a Pokémon</div>
          )}
        </div>
      </div>
    </div>
  )
}
