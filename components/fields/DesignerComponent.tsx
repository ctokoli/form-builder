import React from 'react'
import { type FormElementInstance } from '../FormElements'
import { type CustomInstance } from './TextField'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

export default function DesignerComponent ({ elementInstance }: {
  elementInstance: FormElementInstance
}): JSX.Element {
  const element = elementInstance as CustomInstance
  const { label, required, placeholder, helperText } = element.extraAttributes
  return (
    <div className='flex flex-col gap-2 w-full'>
        <Label>
            {label}
            {required && '*'}
        </Label>
        <Input readOnly disabled placeholder={placeholder} />
        { helperText.length !== 0 && (
            <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>
        )}
    </div>
  )
}
