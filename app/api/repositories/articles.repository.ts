/* eslint-disable @typescript-eslint/no-unused-vars */
import { Categories } from '@prisma/client'
import BaseRepository from './base.repository'

export default class ArticlesRepository extends BaseRepository<Categories> {
  constructor() {
    super('articles')
  }
}
