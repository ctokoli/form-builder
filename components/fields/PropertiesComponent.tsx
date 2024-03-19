import { useForm } from 'react-hook-form'
import { type FormElementInstance } from '../FormElements'
import { propertiesSchema, type CustomInstance } from './TextField'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

export default function PropertiesComponent ({ elementInstance }: {
  elementInstance: FormElementInstance
}): JSX.Element {
  const element = elementInstance as CustomInstance
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeholder
    }
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])
  return (
  <div className="">Form property for { element.extraAttributes.label}</div>
  )
}
