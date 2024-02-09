import { GetFormById } from '@/actions/form'
import React from 'react'

async function BuilderPage ({ params }: { params: { id: string } }): Promise<React.JSX.Element> {
  const { id } = params
  const form = await GetFormById(Number(id))

  if (form == null) { throw new Error('form not found') }

  return (
    <div>{form.name}</div>
  )
}

export default BuilderPage
