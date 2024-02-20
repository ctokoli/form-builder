'use client'

import { useContext } from 'react'
import { DesignerContext, type DesignerContextType } from '../context/DesignerContext'

export default function useDesigner (): DesignerContextType {
  const context = useContext(DesignerContext)

  if (context == null) throw new Error('useDesigner must be used within a DesignerContext')
  return context
}
