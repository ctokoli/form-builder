import { type Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement'
import { type ElementsType, FormElements } from './FormElements'

export default function DragOverlayWrapper (): JSX.Element {
  const [draggedItem, setDraggedItem] = useState< Active | null >(null)
  useDndMonitor({
    onDragStart: (e) => {
      setDraggedItem(e.active)
    },
    onDragCancel: (e) => {
      setDraggedItem(null)
    },
    onDragEnd: (e) => {
      setDraggedItem(null)
    }
  })

  if (draggedItem == null) return null

  let node = <div>No drag overlay</div>

  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement

  if (isSidebarBtnElement !== null) {
    const type = draggedItem.data?.current?.type as ElementsType
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
  }

  return (
    <DragOverlay>{node}</DragOverlay>
  )
}
