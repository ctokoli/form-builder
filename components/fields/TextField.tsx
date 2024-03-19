'use client'

import React from 'react'
import { type FormElement, type ElementsType, type FormElementInstance } from '../FormElements'
import { MdTextFields } from 'react-icons/md'
import DesignerComponent from './DesignerComponent'
import PropertiesComponent from './PropertiesComponent'
import { z } from 'zod'

const type: ElementsType = 'TextField'

const extraAttributes = {
  label: 'Text field',
  helperText: 'Helper Text',
  required: false,
  placeholder: 'Input Value here...'
}

export const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50)
})

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: 'Text Field'
  },
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: PropertiesComponent

}

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}
