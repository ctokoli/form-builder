/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { ImSpinner2 } from 'react-icons/im'
import { BsFileEarmarkPlus } from 'react-icons/bs'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { toast } from './ui/use-toast'
import { formSchema, type formSchemaType } from '@/schemas/form'
import { CreateForm } from '@/actions/form'

export default function CreateFormBtn (): React.JSX.Element {
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit (values: formSchemaType): Promise<void> {
    try {
      const formID = await CreateForm(values)
      toast({
        title: 'Success',
        description: 'Form created successfully',
        variant: 'default'
      })
      console.log(formID)
    } catch (error) {
      toast({
        title: 'Error',
        description: `Something went wrong, please try again later. ${(error as Error).toString()}`,
        variant: 'destructive'
      })
      console.log(error)
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={'outline'}
          className="group border border-primary/20 h-[190px] items-center justify-center flex-col hover:border-primary hover:cursor-pointerborder-dashed gap-4">
          <BsFileEarmarkPlus className='h-8 w-8 text-muted-foreground group-hover:text-primary' />
          Create New Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <Form {...form} >
          <form onSubmit={() => form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
            className='w-full mt-4'>
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && (
              <ImSpinner2 className='animate-spin' />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
