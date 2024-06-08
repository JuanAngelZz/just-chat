import { generate } from 'random-words'

export const generateRandomUsername = () => {
  const words = generate({
    exactly: 2,
    join: '-',
    formatter: (word) => word.toUpperCase()
  })
  const randomNumber = Math.floor(1000 + Math.random() * 9000)

  return `${words}-${randomNumber.toString()}`
}
