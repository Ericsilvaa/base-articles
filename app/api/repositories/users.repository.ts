/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@database/index'
import { Users } from '@prisma/client'

class UsersRepository {
  async findUnique(where: any) {
    return await prisma.users.findUnique({ where: { ...where } })
  }

  async create(data: any) {
    return await prisma.users.create({ data })
  }

  async findAll(where: any) {
    return await prisma.users.findMany({ where: { ...where } })
  }

  async findMany(where: any, options: any) {
    return await prisma.articles.findMany({
      where: { ...where },
      ...options,
    })
  }

  async update(where: any, data: Partial<Users>) {
    return await prisma.users.update({ where: { ...where }, data })
  }

  async delete(where: any) {
    return await prisma.users.delete({ where: { ...where } })
  }
}

export default new UsersRepository()
