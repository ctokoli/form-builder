import React, { useForm } from 'react-hook-form'
import { type FormElementInstance } from '../FormElements'
import { propertiesSchema, type CustomInstance } from './TextField'
import { type z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import useDesigner from '../hooks/useDesigner'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>

export default function PropertiesComponent ({ elementInstance }: {
  elementInstance: FormElementInstance
}): JSX.Element {
  const element = elementInstance as CustomInstance
  const { updateElement } = useDesigner()
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

  function applyChanges (values: propertiesFormSchemaType): void {
    const { label, helperText, placeHolder, required } = values
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeHolder,
        required
      }
    })
    console.log('blur')
  }
  return <Form {...form}>
    <form onBlur={() => { form.handleSubmit(applyChanges) }}
    className='space-y-3'
    // onSubmit={(e) => {
    //   e.preventDefault()
    // }}
    >
      <FormField
        control={form.control}
        name='label'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Label</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormDescription>
              The label of the field. <br /> it will be displayed above the field
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
     />
    </form>
  </Form>
}
