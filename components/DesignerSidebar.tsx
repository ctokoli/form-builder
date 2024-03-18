import React from 'react'
import useDesigner from './hooks/useDesigner'
import FormElementsSidebar from './FormElementsSidebar'
import PropertiesFormSidebar from './PropertiesFormSidebar'

export default function DesignerSidebar (): JSX.Element {
  const { selectedElement } = useDesigner()
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-1-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {selectedElement === null && <FormElementsSidebar />}
      {selectedElement !== null && <PropertiesFormSidebar />}
    </aside>
  )
}
