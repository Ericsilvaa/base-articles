/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@database/index'
import { Categories } from '@prisma/client'

class CategoriesRepository {
  static async findUnique(where: any, options: any = {}) {
    return await prisma.categories.findUnique({
      where: { ...where },
      ...options,
    })
  }

  static async create(data: any) {
    return await prisma.categories.create({ data })
  }

  static async findAll(where: any = {}) {
    return await prisma.categories.findMany({ where: { ...where } })
  }

  static async findMany(where: any = {}, select: any = {}, options: any = {}) {
    return await prisma.categories.findMany({
      where: { ...where },
      ...options,
      select: { ...select },
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
