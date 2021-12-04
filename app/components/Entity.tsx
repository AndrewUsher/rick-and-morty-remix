import React from 'react'
import { BackButton } from './BackButton'

type Info = {
  label: string,
  info: string
}

type EntityInfo = {
  image: string,
  name: string,
  info: Info[]
}

type EntityInfoProps = {
  entityInfo: EntityInfo
}

type LineItemProps = {
  label: string,
  info: string
}

function LineItem ({ label, info }: LineItemProps) {
  return (
    <p className="flex justify-between w-4/5 border-b border-gray-400 py-4 my-2"><span className="text-green-600 font-bold">{label}</span>{info}</p>
  )
}

function Entity ({ entityInfo }: EntityInfoProps): JSX.Element {
  return (
    <main className='h-screen bg-yellow-300 p-10 py-12'>
      <BackButton to="/characters/1" />
      <div className="bg-white h-3/5 w-9/12 m-auto my-16 flex justify-between">
        <img className="w-1/2" src={entityInfo.image} alt="" />
        <div className="pl-16 py-12 w-1/2">
          <h2 className="text-green-600 font-bold text-4xl mb-8">{entityInfo.name}</h2>
          {entityInfo.info.map(({ label, info }) => (
            <LineItem key={label} label={label} info={info}></LineItem>
          ))}
        </div>
      </div>
    </main>
  )
}

export { Entity, EntityInfo }
