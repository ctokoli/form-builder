import type React from 'react'
import { TextFieldFormElement } from './fields/TextField'
import { type IconType } from 'react-icons/lib'

export type ElementsType = 'TextField'

export interface FormElement {
  type: ElementsType

  construct: (id: string) => FormElementInstance

  designerBtnElement: {
    icon: IconType
    label: string
  }

  designerComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
  formComponent: React.FC
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
}

export interface FormElementInstance {
  id: string
  type: ElementsType
  extraAttributes?: Record<string, any>
}

type FormElementsType = {
  [key in ElementsType]: FormElement;
}

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement
}
