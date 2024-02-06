'use server'

import { currentUser } from '@clerk/nextjs'
import prisma from './../lib/prisma'
import { formSchema, type formSchemaType } from '@/schemas/form'

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
      content: '' // Add the 'content' property with an empty string value
    }
  })

  if (newForm == null) {
    throw new Error('Form creation failed')
  }

  return newForm.id
}
