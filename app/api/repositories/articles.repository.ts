/* eslint-disable @typescript-eslint/no-unused-vars */
import { Categories } from '@prisma/client'
import { prisma } from '@database/index'

export class ArticlesRepository {
  async findUnique(where: any) {
    return await prisma.articles.findUnique({ where: { ...where } })
  }

  async create(data: any) {
    return await prisma.articles.create({ data })
  }

  async findAll() {
    return await prisma.articles.findMany({})
  }

  async findMany(where: any, options: any) {
    return await prisma.articles.findMany({
      where: { ...where },
      ...options,
    })
  }

  async update(where: any, data: any) {
    return await prisma.articles.update({ where: { ...where }, data })
  }

  async delete(where: any) {
    return await prisma.articles.delete({ where: { ...where } })
  }
}

export default new ArticlesRepository()
