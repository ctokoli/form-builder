import React, { useState } from 'react'
import { type FormElementInstance, FormElements } from './FormElements'
import { useDroppable } from '@dnd-kit/core'
import { Button } from './ui/button'
import { BiSolidTrash } from 'react-icons/bi'
import useDesigner from './hooks/useDesigner'
import { cn } from '@/lib/utils'

export default function DesignerElementWrapper ({ element }: { element: FormElementInstance }): JSX.Element {
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
  const DesignerElement = FormElements[element.type].designerComponent
  return (
    <div
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
    >
      <div
        className='flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 pointer-events-none'
      >
        <DesignerElement elementInstance={element} />
      </div>
      <div
        ref={topHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-md"
      />
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute w-full bottom-0 h-1/2 rounded-md"
      />
      {mouseIsOver && (
        <>
          <div
            className="absolute right-0 h-full">
            <Button
              className='flex justify-items-center h-full border rounded-md rounded-l-none bg-red-500'
              variant={'outline'}
              onClick={() => {
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
    </div>
  )
}
