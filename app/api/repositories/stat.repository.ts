/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@database/index'
import { Stats } from '@prisma/client'

class StatsRepository {
  static async findUnique(where: any) {
    return await prisma.stats.findUnique({ where: { ...where } })
  }

  static async create(data: any) {
    return await prisma.stats.create({ data })
  }

  static async findAll() {
    return await prisma.stats.findMany({})
  }

  static async findMany(where: any = {}, options: any = {}) {
    return await prisma.stats.findMany({
      where: { ...where },
      ...options,
    })
  }

  async update(where: any, data: Partial<Stats>) {
    return await prisma.stats.update({ where: { ...where }, data })
  }

  async delete(where: any) {
    return await prisma.stats.delete({ where: { ...where } })
  }
}

export default StatsRepository
