import { type Active, DragOverlay, useDndMonitor } from '@dnd-kit/core'
import React, { useState } from 'react'
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement'
import { type ElementsType, FormElements } from './FormElements'
import useDesigner from './hooks/useDesigner'

export default function DragOverlayWrapper (): JSX.Element {
  const { elements } = useDesigner()
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

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement
  if (isDesignerElement !== null) {
    const elementId = draggedItem.data?.current?.elementId
    const element = elements.find((el) => el.id === elementId)
    if (element === null) node = <div>Element not found!</div>
    else {
      const elementType = element?.type
      if (elementType !== undefined) {
        const DesignerElementComponent = FormElements[elementType].designerComponent
        if (element !== undefined) {
          node = (
            <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-8 pointer pointer-events-none">
              <DesignerElementComponent elementInstance={element} />
            </div>
          )
        }
      }
    }
  }

  return (
    <DragOverlay>{node}</DragOverlay>
  )
}
