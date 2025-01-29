"use client"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import HoverMenu from "./HoverMenu"

const categories = [
  {
    name: "Ванная",
    subcategories: [
      { name: "Ванны", href: "/bathroom/baths" },
      { name: "Душевые", href: "/bathroom/showers" },
      { name: "Раковины", href: "/bathroom/sinks" },
    ],
    images: ["/img/bathroom1.jpg", "/img/bathroom2.jpg", "/img/bathroom3.jpg", "/img/bathroom4.jpg"],
  },
  {
    name: "Кухня",
    subcategories: [
      { name: "Мойки", href: "/kitchen/sinks" },
      { name: "Смесители", href: "/kitchen/faucets" },
      { name: "Столешницы", href: "/kitchen/countertops" },
    ],
    images: ["/img/kitchen1.jpg", "/img/kitchen2.jpg", "/img/kitchen3.jpg", "/img/kitchen4.jpg"],
  },
  // Добавьте остальные категории по необходимости
]

export default function Header() {
  const [isVisible, setIsVisible] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [isMenuLocked, setIsMenuLocked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsAtTop(currentScrollY === 0)
      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleMouseEnter = (categoryName: string) => {
    if (!isMenuLocked) {
      setActiveCategory(categoryName)
    }
  }

  const handleMouseLeave = () => {
    if (!isMenuLocked) {
      setActiveCategory(null)
    }
  }

  const handleClick = (categoryName: string) => {
    if (activeCategory === categoryName && isMenuLocked) {
      setIsMenuLocked(false)
      setActiveCategory(null)
    } else {
      setIsMenuLocked(true)
      setActiveCategory(categoryName)
    }
  }

  const closeMenu = () => {
    setIsMenuLocked(false)
    setActiveCategory(null)
  }

  const isHeaderWhite = !isAtTop || activeCategory !== null

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${isHeaderWhite ? "bg-white shadow-md" : "bg-transparent"}`}
    >
      <div className="max-w-1440 mx-auto lg:px-24 px-5">
        <nav className="flex items-center justify-between h-20 text-header">
          <Link
            href="/"
            className={`lg:block hidden text-2xl font-bold ${isHeaderWhite ? "text-black" : "text-white"}`}
          >
            <Image src="/img/logo.svg" alt="Logo" width={263} height={35} className="object-contain" />
          </Link>
          <Link
            href="/"
            className={`block lg:hidden text-2xl font-bold ${isHeaderWhite ? "text-black" : "text-white"}`}
          >
            <Image src="/img/logo.svg" alt="Logo" width={168} height={22} className="object-contain" />
          </Link>
          <ul className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <li
                key={category.name}
                className={`hover:opacity-80 transition-colors relative ${isHeaderWhite ? "text-black" : "text-white"}`}
                onMouseEnter={() => handleMouseEnter(category.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={"/"} onClick={() => handleClick(category.name)} className="py-2 block">
                  {category.name}
                </Link>
                <div
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-300 ${
                    activeCategory === category.name ? "scale-x-100" : ""
                  }`}
                />
              </li>
            ))}
            <li className={`hover:opacity-80 transition-colors ${isHeaderWhite ? "text-black" : "text-white"}`}>
              <Link href={"/"}>Сервисы</Link>
            </li>
            <li className={`hover:opacity-80 transition-colors ${isHeaderWhite ? "text-black" : "text-white"}`}>
              <Link href={"/"}>О компании</Link>
            </li>
          </ul>
          <button
            className={`p-2 rounded-full transition-colors ${isHeaderWhite ? "hover:bg-black/10" : "hover:bg-white/10"}`}
          >
            <Search className={`w-5 h-5 ${isHeaderWhite ? "text-black" : "text-white"}`} />
          </button>
        </nav>
      </div>
      {categories.map((category) => (
        <HoverMenu
          key={category.name}
          category={category}
          isVisible={activeCategory === category.name}
          onClose={closeMenu}
        />
      ))}
    </header>
  )
}

