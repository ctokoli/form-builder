'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaArrowLeft } from 'react-icons/fa'

export default function errorPage ({ error }: { error: Error }): React.JSX.Element {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex w-full h-full flex-col items-center justify-center gap-5'>
        <h2 className='text-destructive text-4xl'>Something went wrong!</h2>
        <Button asChild>
            <Link href={'/'}>Go back home <FaArrowLeft className='ml-3' /> </Link>
        </Button>
    </div>
  )
}
