import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

class PrismaConnection {
  dbConnection: PrismaClient
  static prisma: any

  constructor() {
    this.dbConnection = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    })
  }

  async connect() {
    try {
      await this.dbConnection.$connect()
      console.log('Connected to Prisma')
    } catch (error) {
      console.error('Error connecting to Prisma:', error)
      throw error
    }
  }

  async disconnect() {
    try {
      await this.dbConnection.$disconnect()
      console.log('Disconnected from Prisma')
    } catch (error) {
      console.error('Error disconnecting from Prisma:', error)
      throw error
    }
  }
}

export default PrismaConnection
