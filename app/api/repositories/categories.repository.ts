/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@database/index'
import { Categories } from '@prisma/client'

class CategoriesRepository {
  static async findUnique(where: any) {
    return await prisma.categories.findUnique({ where: { ...where } })
  }

  static async create(data: any) {
    return await prisma.categories.create({ data })
  }

  static async findAll() {
    return await prisma.categories.findMany({})
  }

  static async findMany(where: any = {}, select: any = {}, options: any = {}) {
    return await prisma.categories.findMany({
      select: { ...select },
      ...options,
      where: { ...where },
    })
  }

  static async findManyWithWhere(where: any, options?: any) {
    return await prisma.categories.findMany({
      where: { ...where },
      ...options,
    })
  }

  static async update(where: any, data: Partial<Categories>) {
    return await prisma.categories.update({ where: { ...where }, data })
  }

  static async delete(where: any) {
    return await prisma.categories.delete({ where })
  }
}

export default CategoriesRepository
