import React, { type ReactNode } from 'react'
import { LoaderFunction, useLoaderData } from 'remix'
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

export default function CharactersRoute (): ReactNode {
  const entityInfo = useLoaderData<EntityInfo>()
  return (
    <Entity entityInfo={entityInfo} />
  )
}
