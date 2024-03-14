/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from '@database/index'
import { Categories } from '@prisma/client'
import BaseRepository from './base.repository'

export default class CategoriesRepository extends BaseRepository<Categories> {
  constructor() {
    super(prisma.categories)
  }
}
