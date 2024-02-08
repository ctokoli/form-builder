import React, { type ReactNode } from 'react'

export default function layout ({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <div className='flex w-full flex-grow mx-auto'>{children}</div>
  )
}
