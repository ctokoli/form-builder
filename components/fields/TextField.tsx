'use client'

import React from 'react'

import { type FormElement, type ElementsType } from '../FormElements'
import { MdTextFields } from 'react-icons/md'

const type: ElementsType = 'TextField'

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: 'Text field',
      helperText: 'Helper Text',
      required: false,
      placeholder: 'Input Value here...'
    }
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: 'Text Field'
  },
  designerComponent: () => <div> Designer Component</div>,
  formComponent: () => <div>form Component</div>,
  propertiesComponent: () => <div>Properties Component</div>

}
