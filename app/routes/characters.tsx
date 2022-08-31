import React, { useEffect, useState, type ReactNode } from 'react'
import { LoaderFunction, MetaFunction, useFetcher, useLoaderData } from 'remix'

enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'unknown',
}

interface Location {
  name: string;
  url: string;
}

enum Status {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}

type Character = {
  gender: Gender;
  id: number;
  image: string;
  location: Location;
  name: string;
  origin: Location;
  species: string;
  status: Status;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const url = new URL(request.url)
  const pageNumber = url.searchParams.get('page') || 1
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${pageNumber}`
  )
  const data = await res.json()

  const parsedResults = data.results.map((character: Character) => ({
    gender: character.gender,
    id: character.id,
    image: character.image,
    location: character.location,
    name: character.name,
    origin: character.origin,
    species: character.species,
    status: character.status
  }))

  return parsedResults
}

export const meta: MetaFunction = () => {
  return {
    description: 'Browse Rick and Morty Characters | Mortypedia',
    title: 'Characters | Mortypedia'
  }
}

type LineItemProps = {
  label: string;
  value: string;
};

function LineItem ({ label, value }: LineItemProps) {
  return (
    <p className="flex justify-between items-baseline border-b-2 mb-2 pb-2 text-lg font-semibold">
      {label} <span className="font-normal text-base">{value}</span>
    </p>
  )
}

let pageNumber = 1

export default function CharactersRoute (): ReactNode {
  const data = useLoaderData<Character[]>()

  const [results, setResults] = useState(data)
  const [scrollingDown, setScrollingDown] = useState(true)

  const fetcher = useFetcher()

  useEffect(() => {
    if (fetcher.data) {
      setResults((prevResults: Character[]) => [
        ...prevResults,
        ...fetcher.data
      ])
    }
  }, [fetcher.data])

  useEffect(() => {
    let scrollPosition = 0
    let scrollDirection

    window.addEventListener('scroll', function (e) {
      scrollDirection = (document.body.getBoundingClientRect()).top > scrollPosition ? 'up' : 'down'
      scrollPosition = (document.body.getBoundingClientRect()).top
      setScrollingDown(scrollDirection === 'down')
    })
    return () => {
      window.removeEventListener('scroll', function (e) {
        scrollDirection = (document.body.getBoundingClientRect()).top > scrollPosition ? 'up' : 'down'
        scrollPosition = (document.body.getBoundingClientRect()).top
        setScrollingDown(scrollDirection === 'down')
      })
    }
  }, [])

  const scrollTo = (x: number, y: number) => {
    window.scrollTo(x, y)
  }
  const scrollToTop = () => {
    scrollTo(0, 0)
  }
  const scrollToBottom = () => {
    scrollTo(0, document.body.scrollHeight)
  }

  const handleOnClick = () => {
    if (scrollingDown) {
      scrollToBottom()
    } else {
      scrollToTop()
    }
  }

  return (
    <main className="py-4 container mx-auto">
      <div className="grid gap-x-4 gap-y-8 grid-cols-1 lg:grid-cols-4 sm:grid-cols-1 mb-8">
        {results.map((character, index) => (
          <article key={character.id} className="mx-auto pb-4 shadow w-full">
            <img
              className="w-full mb-4"
              loading={index < 2 ? 'eager' : 'lazy'}
              src={character.image}
              alt=""
            />
            <div className="pl-8 pr-8">
              <h2 className="mb-4 text-2xl font-bold">{character.name}</h2>
              <LineItem label="Gender" value={character.gender} />
              <LineItem label="Species" value={character.species} />
              <LineItem label="Status" value={character.status} />
            </div>
          </article>
        ))}
      </div>
      <div className="fixed bottom-10 right-10 animate-pulse scale-125">
        <button onClick={handleOnClick}>
          {scrollingDown ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>
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
