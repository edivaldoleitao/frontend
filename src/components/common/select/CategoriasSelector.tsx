import { useState, useRef, useEffect } from "react"
import "./categoriasSelector.css"

interface Props {
  selected: string[]
  setSelected: (val: string[]) => void
  label?: string
  options?: string[]
}

export function CategoriasSelector({
  selected,
  setSelected,
  label = "Categorias Favoritas",
  options = ["gamer", "home_office", "estudo"],
}: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggle = (cat: string) => {
    if (selected.includes(cat)) {
      setSelected(selected.filter((c: string) => c !== cat))
    } else {
      setSelected([...selected, cat])
    }
  }

  const formatLabel = (cat: string) =>
    cat.charAt(0).toUpperCase() + cat.slice(1).replace("_", " ")

  return (
    <div ref={ref} className="categorias-container">
      <label htmlFor="categorias" className="categorias-label">
        {label}
      </label>

      <div onClick={() => setOpen((prev) => !prev)} className="categorias-input">
        {selected.map((cat) => (
          <span key={cat} onClick={(e) => e.stopPropagation()} className="categoria-tag">
            {formatLabel(cat)}
            <span onClick={() => toggle(cat)} className="categoria-tag-remove">
              ✕
            </span>
          </span>
        ))}

        <span className="categorias-icon">▼</span>
      </div>

      {open && (
        <div className="categorias-dropdown">
          {options.map((cat) => (
            <label key={cat} className="categoria-option">
              <input
                type="checkbox"
                checked={selected.includes(cat)}
                onChange={() => toggle(cat)}
              />
              {formatLabel(cat)}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
