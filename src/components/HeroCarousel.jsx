import React, { useEffect, useRef, useState } from "react"
import PokemonCard from "./PokemonCard"

function CardLazy({ name, url }) {
  const [detail, setDetail] = useState(null)
  const ref = useRef(null)

  useEffect(() => {
    let obs
    let cancelled = false

    async function fetchDetail() {
      try {
        const res = await fetch(url)
        const d = await res.json()
        if (!cancelled) setDetail(d)
      } catch {}
    }

    if ("IntersectionObserver" in window) {
      obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchDetail()
            obs.disconnect()
          }
        })
      })
      if (ref.current) obs.observe(ref.current)
    } else {
      fetchDetail()
    }

    return () => {
      cancelled = true
      if (obs) obs.disconnect()
    }
  }, [url])

  return (
    <div ref={ref} className="flex-shrink-0 w-56">
      {detail ? (
        <PokemonCard pokemon={detail} />
      ) : (
        <div className="w-56 h-64 rounded-2xl bg-gray-200 flex items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  )
}

export default function HeroCarousel() {
  const [pokemons, setPokemons] = useState([])
  const [offset, setOffset] = useState(0)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
        const data = await res.json()
        const allPokemons = data.results
        const shuffled = allPokemons.sort(() => Math.random() - 0.5)
        const random20 = shuffled.slice(0, 20)
        setPokemons(random20)
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [])

  useEffect(() => {
    const speed = 40
    function step(time) {
      if (lastTimeRef.current != null) {
        const dt = time - lastTimeRef.current
        const dx = (speed * dt) / 1000
        setOffset((prev) => prev - dx)
      }
      lastTimeRef.current = time
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTimeRef.current = null
    }
  }, [])

  function scrollLeft() {
    setOffset((prev) => prev + 300)
  }

  function scrollRight() {
    setOffset((prev) => prev - 300)
  }

  const cardWidth = 224 + 24
  const totalWidth = pokemons.length * cardWidth || 1
  const translateX = offset % totalWidth

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden flex items-center bg-transparent">
      <div className="w-full h-full overflow-hidden relative">
        <div
          className="flex gap-6 items-center absolute top-0 left-0 h-full"
          style={{
            transform: `translateX(${translateX}px)`,
            width: totalWidth * 2,
            transition: "transform 0.3s linear",
          }}
        >
          {[...pokemons, ...pokemons].map((p, idx) => (
            <CardLazy key={idx + "-" + p.name} name={p.name} url={p.url} />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-500/30 hover:bg-gray-500/60 text-white px-4 py-6 z-50 rounded-full"
      >
        ◀
      </button>
      <button
        type="button"
        onClick={scrollRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-500/30 hover:bg-gray-500/60 text-white px-4 py-6 z-50 rounded-full"
      >
        ▶
      </button>
    </div>
  )
}
