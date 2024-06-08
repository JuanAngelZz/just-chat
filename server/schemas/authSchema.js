import { z } from 'zod'

export const authSchema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string'
    })
    .min(3, 'Username must be at least 3 characters long'),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string'
    })
    .email({
      message: 'Email must be a valid email'
    }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string'
    })
    .min(6, 'Password must be at least 6 characters long'),
  avatar: z
    .string({
      invalid_type_error: 'Avatar must be a string'
    })
    .url({
      message: 'Avatar must be a valid URL'
    })
    .endsWith('.png')
    .optional()
})
