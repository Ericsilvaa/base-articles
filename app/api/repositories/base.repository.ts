import { prisma } from '@database/index'
import { IBaseRepository } from './base/inteface.BaseRepository'
import { Prisma } from '@prisma/client'
import { DefaultArgs } from '@prisma/client/runtime/library'
// type CollectionToModel<T extends DbCollection> = T extends 'users'
//   ? Users
//   : T extends 'categories'
//   ? Categories
//   : Articles

type DbCollection =
  | Prisma.UsersDelegate<DefaultArgs>
  | Prisma.CategoriesDelegate<DefaultArgs>
  | Prisma.ArticlesDelegate<DefaultArgs>

export default class BaseRepository<T> implements IBaseRepository<T> {
  constructor(protected collection: DbCollection) { }

  async findAll() {
    return await this.collection.findMany() // Fixed: Added parentheses to call the method
  }

  async save(data: any): Promise<void> {
    await this.collection.create({ data: { ...data } })
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
