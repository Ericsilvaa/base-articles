/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@database/index'
import { Categories } from '@prisma/client'

class CategoriesRepository {
  async findUnique(where: any) {
    return await prisma.categories.findUnique({ where: { ...where } })
  }

  async create(data: any) {
    return await prisma.categories.create({ data })
  }

  async findAll() {
    return await prisma.categories.findMany({})
  }

  async findMany(where: any, options: any) {
    return await prisma.articles.findMany({
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

export default new CategoriesRepository()
