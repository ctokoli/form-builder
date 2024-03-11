'use client'

import React, { type ReactNode, createContext, useState } from 'react'
import { type FormElementInstance } from '../FormElements'

export interface DesignerContextType {
  elements: FormElementInstance[]
  addElement: (index: number, element: FormElementInstance) => void
  removeElement: (id: string) => void

  selectedElement: FormElementInstance | null
  setSelectedElement: React.Dispatch<React.SetStateAction<FormElementInstance | null>>
}

export const DesignerContext = createContext<DesignerContextType | null>(null)

export default function DesignerContextProvider ({
  children
}: { children: ReactNode }): JSX.Element {
  const [elements, setElements] = useState<FormElementInstance[]>([])
  const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null)

  const addElement = (index: number, element: FormElementInstance): void => {
    setElements((prev) => {
      const newElements = [...prev]
      newElements.splice(index, 0, element)
      return newElements
    })
  }

  const removeElement = (id: string): void => {
    setElements((prev) => prev.filter((element) => element.id !== id))
  }

  return <DesignerContext.Provider value={
    {
      elements,
      addElement,
      removeElement,
      selectedElement,
      setSelectedElement
    }
  }>{children}</DesignerContext.Provider>
}
