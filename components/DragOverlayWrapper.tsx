import { useDndMonitor } from '@dnd-kit/core'
import React from 'react'

export default function DragOverlayWrapper (): JSX.Element {
  useDndMonitor({
    onDragStart: (e) => {
      console.log('DRAG AN ITEM', e)
    }
  })
  return (
    <div>DragOverlayWrapper</div>
  )
}
