import React, { type ReactNode } from 'react'
import { json, LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Entity, EntityInfo } from '~/components/Entity'

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
    const data = await res.json()

    if (data.error) {
      throw json({ message: 'Character not found' })
    }

    return {
      image: data.image,
      info: [
        { label: 'Gender', info: data.gender },
        { label: 'Species', info: data.species },
        { label: 'Status', info: data.status }
      ],
      name: data.name
    }
  } catch (error) {
    throw json({ message: 'Character not found' })
  }
}

export const meta: MetaFunction = ({ data }: {data: EntityInfo | null}) => {
  if (!data) {
    return {
      description: 'Character Not Found | Mortypedia',
      'og:image': '',
      title: 'Character Not Found | Mortypedia'
    }
  }

  return {
    description: `More Information about ${data.name} from Rick and Morty`,
    'og:image': data.image,
    title: `${data.name} | Mortypedia`
  }
}

export function CatchBoundary () {
  return (
    <div className="h-screen bg-green-600 text-center py-16">
      <h2 className="text-4xl font-bold">Character not found</h2>
    </div>
  )
}

export default function CharactersRoute (): ReactNode {
  const entityInfo = useLoaderData<EntityInfo>()
  return (
    <Entity entityInfo={entityInfo} />
  )
}
