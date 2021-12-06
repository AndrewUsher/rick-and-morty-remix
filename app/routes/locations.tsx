import React, { type ReactNode } from 'react'
import { LoaderFunction, MetaFunction, useFetcher, useLoaderData } from 'remix'

type Location = {
  id: number,
  dimension: string,
  name: string,
  type: string
}

type Response = {
  results: Location[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const pageNumber = url.searchParams.get('page') || 1
  const res = await fetch(`https://rickandmortyapi.com/api/location?page=${pageNumber}`)
  const data: Response = await res.json()

  const parsedResults: Location[] = data.results.map((location) => ({
    id: location.id,
    dimension: location.dimension,
    name: location.name,
    type: location.type
  }))

  return parsedResults
}

export const meta: MetaFunction = () => {
  return {
    description: 'Browse Rick and Morty Locations | Mortypedia',
    title: 'Locations | Mortypedia'
  }
}

let pageNumber = 1

export default function LocationsRoute (): ReactNode {
  const data = useLoaderData<Location[]>()
  const [results, setResults] = React.useState(data)
  const fetcher = useFetcher()

  React.useEffect(() => {
    if (fetcher.data) {
      setResults((prevResults: Location[]) => [...prevResults, ...fetcher.data])
    }
  }, [fetcher.data])
  return (
    <main className="py-4 container mx-auto">
      <div className="grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 mb-8">
        {results.map(location => (
          <article key={location.id} className="mx-auto">
            <div>{location.name}</div>
            <div>{location.dimension}</div>
            <div>{location.type}</div>
          </article>
        ))}
      </div>
      <button
        className="mx-auto my-4 block bg-green-700 text-white px-4 py-4 text-lg shadow-md disabled:bg-gray-400 disabled:text-black disabled:line-through"
        disabled={fetcher.state === 'submitting'}
        onClick={() => {
          pageNumber++
          fetcher.submit(new URLSearchParams(`page=${pageNumber}`))
        }}>
          Next Page
      </button>
    </main>
  )
}
