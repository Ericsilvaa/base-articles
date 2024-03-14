import { prisma } from '@database/index'
import { IBaseRepository } from './base/inteface.BaseRepository'
import { Prisma, PrismaClient } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
// type CollectionToModel<T extends DbCollection> = T extends 'users'
//   ? Users
//   : T extends 'categories'
//   ? Categories
//   : Articles

type DbCollection = 'users' | 'categories' | 'articles'

export default class BaseRepository<T> implements IBaseRepository<T> {
  dbCollection:
    | Prisma.UsersDelegate<DefaultArgs>
    | Prisma.CategoriesDelegate<DefaultArgs>
    | Prisma.ArticlesDelegate<DefaultArgs>

  constructor(collectionName: DbCollection) {
    this.dbCollection = {
      users: prisma.users,
      categories: prisma.categories,
      articles: prisma.articles,
    } as Record<
      DbCollection,
      Prisma.UsersDelegate | Prisma.CategoriesDelegate | Prisma.ArticlesDelegate
    >
  }

  async findAll() {
    return await prisma.categories.findMany() // Fixed: Added parentheses to call the method
  }

  async save(data: any): Promise<void> {
    await this.dbCollection.create({ data: { ...data } })
  }

  findById(data: any): Promise<any> {
    throw new Error('Method not implemented.')
  }

  async findUnique(query: any) {
    return await prisma[this.dbCollection].findMany({ where: { ...query } })
  }

  update(query: T, data: any): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(data: T): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
