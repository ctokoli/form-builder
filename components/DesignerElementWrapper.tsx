import React, { useState } from 'react'
import { type FormElementInstance, FormElements } from './FormElements'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Button } from './ui/button'
import { BiSolidTrash } from 'react-icons/bi'
import useDesigner from './hooks/useDesigner'
import { cn } from '@/lib/utils'

export default function DesignerElementWrapper ({ element, selectedElement, setSelectedElement }:
{ element: FormElementInstance, selectedElement: FormElementInstance | null, setSelectedElement: React.Dispatch<React.SetStateAction<FormElementInstance | null>> }): JSX.Element {
  const { removeElement } = useDesigner()
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)

  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true
    }
  })

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true
    }
  })

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true
    }
  })

  if (draggable === null) return null

  const DesignerElement = FormElements[element.type].designerComponent
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
      }}
     >
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full h-1/2 rounded-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-b-md"
      />
      {mouseIsOver && (
        <>
          <div
            className="absolute right-0 h-full z-100">
            <Button
              className='flex justify-items-center h-full border rounded-md rounded-l-none bg-red-500'
              variant={'outline'}
              onClick={(e) => {
                e.stopPropagation()
                removeElement(element.id)
              }}
            >
              <BiSolidTrash className='h-6 w-6' />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className='text-muted-foreground text-sm'>
              Click for Properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none"></div>
      )}
       <div
        className={cn('flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 pointer-events-none',
          mouseIsOver && 'opacity-30'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-b-md h-[7px] bg-primary "></div>
      )}
    </div>
  )
}
