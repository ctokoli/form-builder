import { type FormElementInstance } from '../FormElements'
import { type CustomInstance } from './TextField'

export default function PropertiesComponent ({ elementInstance }: {
  elementInstance: FormElementInstance
}): JSX.Element {
  const element = elementInstance as CustomInstance
  return (
  <div className="">Form property for { element.extraAttributes.label}</div>
  )
}
