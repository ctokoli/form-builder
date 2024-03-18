import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from './FormElements'

export default function FormElementsSidebar (): JSX.Element {
  return (
     <div className="">
         Elements
         <SidebarBtnElement formElement={FormElements.TextField} />
     </div>
  )
}
