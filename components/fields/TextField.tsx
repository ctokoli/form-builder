'use client'

import React from 'react'

import { type FormElement, type ElementsType, type FormElementInstance } from '../FormElements'
import { MdTextFields } from 'react-icons/md'
import DesignerComponent from './DesignerComponent'

const type: ElementsType = 'TextField'

const extraAttributes = {
  label: 'Text field',
  helperText: 'Helper Text',
  required: false,
  placeholder: 'Input Value here...'
}

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
  formComponent: () => <div>form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>

}

export type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}
