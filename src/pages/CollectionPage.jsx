import React, { useEffect, useMemo, useState, useRef } from "react"
import PokemonCard from "../components/PokemonCard"
import arrowImg from "../assets/arrow.png"

export default function CollectionPage() {
  const [allList, setAllList] = useState([])
  const [displayed, setDisplayed] = useState([])
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [showTopButton, setShowTopButton] = useState(false)
  const [visibleCount, setVisibleCount] = useState(20)
  const loaderRef = useRef(null)

  const types = useMemo(
    () => [
      "all",
      "normal",
      "fire",
      "water",
      "grass",
      "electric",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ],
    []
  )

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
        const data = await res.json()
        const list = data.results.slice(0, 2000)
        setAllList(list)
        const firstBatch = await Promise.all(
          list.slice(0, 20).map(async (p) => {
            const r = await fetch(p.url)
            return await r.json()
          })
        )
        setDisplayed(firstBatch)
      } catch {
        setDisplayed([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { threshold: 1 }
    )
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => observer.disconnect()
  }, [displayed])

  async function loadMore() {
    if (displayed.length >= allList.length) return
    const next = allList.slice(visibleCount, visibleCount + 20)
    const nextData = await Promise.all(
      next.map(async (p) => {
        const r = await fetch(p.url)
        return await r.json()
      })
    )
    setDisplayed((prev) => [...prev, ...nextData])
    setVisibleCount((prev) => prev + 20)
  }

  const filtered = useMemo(() => {
    return displayed.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        (filter === "all" || p.types.some((t) => t.type.name === filter))
    )
  }, [displayed, query, filter])

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div className="p-6 relative min-h-screen" style={{ backgroundColor: "#4a565e" }}>
      <h1 className="text-4xl font-bold mb-4 text-yellow-400 drop-shadow-md">Collection</h1>

      <div className="mb-6 flex items-center gap-4 flex-wrap">
        <label className="font-medium text-white">Search</label>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name"
          className="p-2 rounded border text-black focus:ring-2 focus:ring-yellow-300"
        />
        <label className="font-medium text-white">Filter by type</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded border text-black focus:ring-2 focus:ring-yellow-300"
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {loading && <div className="text-center text-white">Loading...</div>}

      <div className="flex flex-wrap justify-between gap-6">
        {filtered.map((p) => (
          <PokemonCard key={p.name} pokemon={p} compact />
        ))}
      </div>
      
      <div ref={loaderRef} className="text-center text-gray-400 mt-6">
        Loading more Pokémon...
      </div>

      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <img src={arrowImg} alt="Back to top" className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
