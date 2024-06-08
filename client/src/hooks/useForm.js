import { useState } from 'react'

export const useForm = (initialForm) => {
  const [form, setForm] = useState(initialForm)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const resetForm = () => {
    setForm(initialForm)
  }

  return { form, handleChange, resetForm }
}
