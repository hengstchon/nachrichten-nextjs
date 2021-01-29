import Link from 'next/link'
import { useState } from 'react'
import { feeds } from '../config/feeds'

const Nav = ({ navName }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)
  return (
    <div
      className="flex w-full items-center justify-between px-6 h-16 bg-yellow-200 text-gray-700 border-b border-gray-200"
      onKeyDown={({ key }) => {
        isOpen && key === 'Escape' && setIsOpen(false)
      }}
    >
      <button
        className="absolute mr-2"
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

      <span className="mx-auto text-2xl font-bold text-blue-500">
        {navName}
      </span>

      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        {isOpen && (
          <div className="z-10 fixed inset-0 transition-opacity">
            <div
              onClick={toggleOpen}
              className="absolute inset-0 bg-black opacity-50"
              tabIndex="0"
            ></div>
          </div>
        )}
      </transition>

      <aside
        className={`transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {feeds.map(({ navName, cat }) => {
          return (
            <Link key={navName} href={`/${cat}`}>
              <a
                className="flex items-center px-6 py-3 hover:bg-blue-500 hover:text-white"
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
        })}
      </aside>
    </div>
  )
}

export default Nav
