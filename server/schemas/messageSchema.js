import { z } from 'zod'

export const messageSchema = z.object({
  text: z
    .string({
      required_error: 'Text is required',
      invalid_type_error: 'Text must be a string'
    })
    .min(1, 'Text must be at least 1 character long')
    .max(500, 'Text must be at most 500 characters long'),
  audio: z
    .string({
      invalid_type_error: 'Audio must be a string'
    })
    .url({
      message: 'Audio must be a valid URL'
    })
    .optional(),
  document: z
    .string({
      invalid_type_error: 'Document must be a string'
    })
    .url({
      message: 'Document must be a valid URL'
    })
    .optional()
})
