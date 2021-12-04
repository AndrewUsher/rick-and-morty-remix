import React, { type ReactNode } from 'react'
import { LoaderFunction, MetaFunction, useLoaderData } from 'remix'
import { Entity, EntityInfo } from '~/components/Entity'

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${params.id}`)
  const data = await res.json()

  return {
    image: data.image,
    info: [
      { label: 'Gender', info: data.gender },
      { label: 'Species', info: data.species },
      { label: 'Status', info: data.status }
    ],
    name: data.name
  }
}

export const meta: MetaFunction = ({ data }) => {
  return {
    description: `More Information about ${data.name} from Rick and Morty`,
    'og:image': data.image,
    title: `${data.name} | Mortypedia`
  }
}

export default function CharactersRoute (): ReactNode {
  const entityInfo = useLoaderData<EntityInfo>()
  return (
    <Entity entityInfo={entityInfo} />
  )
}
