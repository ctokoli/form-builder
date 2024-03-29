import Link from 'next/link'
import React from 'react'

export default function Logo (): JSX.Element {
  return (
    <Link href={'/'} className='font-bold text-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer'>
        PageForm Builder
    </Link>
  )
}
