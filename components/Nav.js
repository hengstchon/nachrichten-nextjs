import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { feeds } from '../config/feeds'

const Nav = ({ navName }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)
  return (
    <>
      <div className="flex">
        <div className="hidden w-64 h-16 lg:block"></div>
        <div className="flex-1 flex items-center justify-between px-6 h-16 bg-yellow-200 text-gray-700 border-b border-gray-200">
          <button
            className="absolute mr-2 lg:hidden"
            aria-label="Open Menu"
            onClick={toggleOpen}
          >
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="mx-auto text-xl font-bold">{navName}</span>
        </div>
      </div>

      <div
        onClick={toggleOpen}
        className={`fixed inset-0 bg-black transition-opacity ease-in-out duration-300 ${
          isOpen ? 'opacity-50' : 'h-0 opacity-0'
        } lg:hidden`}
      ></div>

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-white overflow-auto transition-all ease-in-out duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:transform-none lg:border-r`}
      >
        <div className="lg:h-16"></div>
        <div className="py-8">
          {feeds.map(({ navName, cat }) => {
            return (
              <NavCat
                key={navName}
                navName={navName}
                cat={cat}
                toggleOpen={toggleOpen}
              />
            )
          })}
        </div>
      </aside>
    </>
  )
}

const NavCat = ({ navName, cat, toggleOpen }) => {
  const router = useRouter()
  const currentCat = router.query.cat
  return (
    <Link href={`/${cat}`}>
      <a
        className={`flex items-center px-6 py-3 hover:bg-yellow-500 hover:text-white ${
          cat === currentCat ? 'text-yellow-500 font-medium' : 'text-gray-500'
        }`}
        onClick={toggleOpen}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        <span className="mx-3">{navName}</span>
      </a>
    </Link>
  )
}

export default Nav
