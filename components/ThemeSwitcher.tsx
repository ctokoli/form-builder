'use client'

import { SunIcon, MoonIcon, DesktopIcon } from '@radix-ui/react-icons'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useTheme } from 'next-themes'
import React, { useEffect } from 'react'

export default function ThemeSwitcher (): React.JSX.Element | null {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null
  return (
        <div>
            <Tabs defaultValue={theme}>
                <TabsList className='[&>*]:p-2'>
                    <TabsTrigger value='light' onClick={() => { setTheme('light') }}>
                        <SunIcon className='h-[1.2rem] w-[1.2rem] ' />
                    </TabsTrigger>
                    <TabsTrigger value='dark' onClick={() => { setTheme('dark') }}>
                        <MoonIcon className='h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0' />
                    </TabsTrigger>
                    <TabsTrigger value='light' onClick={() => { setTheme('system') }}>
                        <DesktopIcon className='h-[1.2rem] w-[1.2rem]' />
                    </TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
  )
}
