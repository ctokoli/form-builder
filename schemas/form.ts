import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().min(4, 'Name must be at least 4 characters'),
  description: z.string().optional()
})

export type formSchemaType = z.infer<typeof formSchema>