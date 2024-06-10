import mongoose from 'mongoose'
import { CONECCTION_STRING } from './config.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(CONECCTION_STRING)
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}
