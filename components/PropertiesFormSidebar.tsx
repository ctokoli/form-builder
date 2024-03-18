import React from 'react'
import useDesigner from './hooks/useDesigner'
import { FormElements } from './FormElements'
import PropertiesForm from './PropertiesForm'
import { Button } from './ui/button'
import { AiOutlineClose } from 'react-icons/ai'
import { isNull } from 'util'

export default function PropertiesFormSidebar (): JSX.Element {
  const { selectedElement, setSelectedElement } = useDesigner()
  if (selectedElement === null) return null
  const FormProperties = FormElements[selectedElement?.type].propertiesComponent

  return (
    <div className="flex flex-col p-2">
        <div className="flex justify-between items-center">
            <p className='text-sm text-foreground/70'> Element Properties</p>
            <Button size={'icon'} variant={'ghost'} onClick={() => {
              setSelectedElement(null)
            }}>
                <AiOutlineClose />
            </Button>
        </div>
        <FormProperties elementInstance={selectedElement} />
    </div>
  )
}
