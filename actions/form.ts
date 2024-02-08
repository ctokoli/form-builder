'use server'

import { currentUser } from '@clerk/nextjs'
import prisma from './../lib/prisma'
import { formSchema, type formSchemaType } from '@/schemas/form'
import { type Form } from '@prisma/client'

class UserNotFoundErr extends Error {}

export async function GetFormStats (): Promise<{
  visits: number
  submissions: number
  submissionRate: number
  bounceRate: number
}> {
  const user = await currentUser()
  if (user == null) throw new UserNotFoundErr()

  const stats = prisma.form.aggregate({
    where: {
      userId: user.id
    },
    _sum: {
      visits: true,
      submissions: true
    }
  })

  const visits = ((await stats)._sum.visits ?? 0)
  const submissions = ((await stats)._sum.submissions ?? 0)

  let submissionRate = 0

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100
  }

  const bounceRate = 100 - submissionRate

  return {
    visits, submissions, submissionRate, bounceRate
  }
}

export async function CreateForm (data: formSchemaType): Promise<number> {
  const validation = formSchema.safeParse(data)

  if (!validation.success) {
    throw new Error('Form Validation failed')
  }
  const user = await currentUser()
  if (user == null) throw new UserNotFoundErr()

  const { name, description = '' } = data

  const newForm = await prisma.form.create({
    data: {
      name,
      description,
      userId: user.id,
      content: ''
    }
  })

  if (newForm == null) {
    throw new Error('Form creation failed')
  }

  return newForm.id
}

export async function GetForms (): Promise<Form[]> {
  const user = await currentUser()
  if (user == null) throw new UserNotFoundErr()

  return await prisma.form.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export async function GetFormById (id: number): Promise<Form> {
  const user = await currentUser()
  if (user == null) throw new UserNotFoundErr()

  const form = await prisma.form.findUnique({
    where: {
      id,
      userId: user.id
    }
  })

  if (form == null) {
    throw new Error('Form not found')
  }

  return form
}
