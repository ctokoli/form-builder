import React from 'react'
import { Button } from './ui/button'
import { HiSaveAs } from 'react-icons/hi'

export default function SaveFormBtn (): JSX.Element {
  return (
    <Button variant={'outline'} className='gap-2'>
        <HiSaveAs className='h-4  w-4' />
        Save
    </Button>
  )
}
