import React, { type ReactNode } from 'react'
import { LoaderFunction, MetaFunction, useFetcher, useLoaderData } from 'remix'

type RawEpisode = {
  air_date: string,
  episode: string,
  id: number,
name: string,
}

type ParsedEpisode = {
  airDate: string,
  episodeNumber: string,
    id: number,
  name: string,
}

type Response = {
  results: RawEpisode[]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const pageNumber = url.searchParams.get('page') || 1
  const res = await fetch(`https://rickandmortyapi.com/api/episode?page=${pageNumber}`)
  const data: Response = await res.json()

  const parsedResults: ParsedEpisode[] = data.results.map((episode) => ({
    airDate: episode.air_date,
    episodeNumber: episode.episode,
    id: episode.id,
    name: episode.name
  }))

  return parsedResults
}

export const meta: MetaFunction = () => {
  return {
    description: 'Browse Rick and Morty Episodes | Mortypedia',
    title: 'Episodes | Mortypedia'
  }
}

type LineItemProps = {
  label: string,
  value: string
}

function LineItem ({ label, value }: LineItemProps) {
  return (
    <p className="flex justify-between items-baseline border-b-2 mb-2 pb-2 text-lg font-semibold">{label} <span className="font-normal text-base">{value}</span></p>
  )
}

let pageNumber = 1

export default function EpisodesRoute (): ReactNode {
  const data = useLoaderData<ParsedEpisode[]>()
  const [results, setResults] = React.useState(data)
  const fetcher = useFetcher()

  React.useEffect(() => {
    if (fetcher.data) {
      setResults((prevResults: ParsedEpisode[]) => [...prevResults, ...fetcher.data])
    }
  }, [fetcher.data])
  return (
    <main className="py-4 container mx-auto">
      <div className="grid gap-x-4 gap-y-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 mb-8">
        {results.map(episode => (
          <article key={episode.id} className="mx-auto pb-4 shadow w-full pl-8 pr-8">
            <h2 className="mb-4 text-2xl font-bold text-center pt-4">{episode.name}</h2>
            <LineItem label="Air Date" value={episode.airDate} />
            <LineItem label="Episode Number" value={episode.episodeNumber} />
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
