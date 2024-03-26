/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@database/index'
import { Categories } from '@prisma/client'

export class CategoriesRepository {
  async findUnique(where: any, options: any = {}) {
    return await prisma.categories.findUnique({
      where: { ...where },
      ...options,
    })
  }

  async create(data: any) {
    return await prisma.categories.create({ data })
  }

  async findAll(where: any = {}) {
    return await prisma.categories.findMany({ where: { ...where } })
  }

  async findMany(where: any = {}, select: any = {}, options: any = {}) {
    return await prisma.categories.findMany({
      where: { ...where },
      ...options,
      select: { ...select },
    })
  }

  async findManyWithWhere(where: any, options?: any) {
    return await prisma.categories.findMany({
      where: { ...where },
      ...options,
    })
  }

  async update(where: any, data: Partial<Categories>) {
    return await prisma.categories.update({ where: { ...where }, data })
  }

  async delete(where: any) {
    return await prisma.categories.delete({ where })
  }
}
