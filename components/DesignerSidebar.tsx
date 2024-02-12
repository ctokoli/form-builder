import React from 'react'
import { FormElements } from './FormElements'
import SidebarBtnElement from './SidebarBtnElement'

export default function DesignerSidebar (): JSX.Element {
  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-1-2 border-muted p-4 bg-background overflow-y-auto h-full">
      Element
      <SidebarBtnElement formElement={FormElements.TextField} />
    </aside>
  )
}
