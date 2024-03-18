/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@database/index'
import { Stats } from '@prisma/client'

class StatsRepository {
  async findUnique(where: any) {
    return await prisma.stats.findUnique({ where: { ...where } })
  }

  async create(data: any) {
    return await prisma.stats.create({ data })
  }

  async findAll() {
    return await prisma.stats.findMany({})
  }

  async findMany(where: any = {}, options: any = {}) {
    return await prisma.stats.findMany({
      where: { ...where },
      ...options,
    })
  }

  async findManyWithWhere(where: any, options?: any) {
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

export default new StatsRepository()
