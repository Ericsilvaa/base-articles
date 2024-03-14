/* eslint-disable @typescript-eslint/no-unused-vars */
import BaseRepository from './base.repository'
import { Users } from '@prisma/client'

export default class UsersRepository extends BaseRepository<Users> {
  constructor() {
    super('users')
  }
}
