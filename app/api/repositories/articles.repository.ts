/* eslint-disable @typescript-eslint/no-unused-vars */
import { Categories } from '@prisma/client'
import BaseRepository from './base.repository'
import { prisma } from '@database/index'

export default class ArticlesRepository extends BaseRepository<Categories> {
  constructor() {
    super(prisma.articles)
  }
}
