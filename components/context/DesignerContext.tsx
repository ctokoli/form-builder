'use client'

import React, { type ReactNode, createContext, useState } from 'react'
import { type FormElementInstance } from '../FormElements'

export interface DesignerContextType {
  elements: FormElementInstance[]
  addElement: (index: number, element: FormElementInstance) => void
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider ({
  children
}: { children: ReactNode }): JSX.Element {
  const [elements, setElements] = useState<FormElementInstance[]>([])

  const addElement = (index: number, element: FormElementInstance): void => {
    setElements((prev) => {
      const newElements = [...prev]
      newElements.splice(index, 0, element)
      return newElements
    })
  }

  return <DesignerContext.Provider value={
    {
      elements,
      addElement
    }
  }>{children}</DesignerContext.Provider>
}