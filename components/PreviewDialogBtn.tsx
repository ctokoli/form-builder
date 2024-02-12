import React from 'react'
import { Button } from './ui/button'
import { MdPreview } from 'react-icons/md'

export default function PreviewDialogBtn (): JSX.Element {
  return (
    <Button className='gap-2' variant={'outline'}>
        <MdPreview className='h-5  w-5' />
        Preview
    </Button>
  )
}
