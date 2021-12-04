import React from 'react'
import { Link } from 'remix'

type Props = {
  to: string
}

function BackButton ({ to }: Props) {
  return (
    <Link to={to} className="bg-green-600 block w-16 h-16 flex items-center justify-center rounded-full text-white">
      <svg className="fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"></path>
      </svg>
    </Link>
  )
}

export { BackButton }
