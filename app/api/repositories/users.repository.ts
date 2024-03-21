/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@database/index'
import { Users } from '@prisma/client'

class UsersRepository {
  static async findUnique(where: any) {
    return await prisma.users.findUnique({
      where: { ...where },
      include: { Categories: true, articles: true },
    })
  }

  static async create(data: any) {
    return await prisma.users.create({ data })
  }

  static async update(where: any, data: Partial<Users>) {
    return await prisma.users.update({ where: { ...where }, data })
  }

  async delete(where: any) {
    return await prisma.users.delete({ where: { ...where } })
  }
}

export default UsersRepository
