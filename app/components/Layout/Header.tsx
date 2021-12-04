import React from 'react'
import { NavLink as Link, NavLinkProps } from 'remix'

const NavLink = ({ children, to }: NavLinkProps) => (
  <Link className="text-xl" to={to}>{children}</Link>
)

const Header = () => {
  return (
    <nav className="bg-green-600 p-6 px-10 flex items-center justify-between">
      <h1 className="text-4xl">Mortypedia</h1>
      <ul className="flex justify-between space-x-6">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/characters">Characters</NavLink>
        <NavLink to="/locations">Locations</NavLink>
        <NavLink to="/episodes">Episodes</NavLink>
      </ul>
    </nav>
  )
}

export { Header }
