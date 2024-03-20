import { Users } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import UsersRepository from '@repositories/users.repository'

import { StatusProps } from '@utils/apiReturn'

export interface IUser {
  id?: string
  name: string
  email: string
  password: string
  confirmPassword: string
}

export class AuthServices {
  protected userRepository = UsersRepository

  async registerUser(data: IUser): Promise<StatusProps> {
    // se eu tiver um id no data, estou pegando pelos parametros, quero atualizar, se não, estou querendo criar
    try {
      const emailExists = await this.userRepository.findUnique({
        email: data.email,
      })

      if (emailExists)
        return {
          code: 404,
          status: false,
          message: 'Email já cadastrado, Por favor escolha outro email!',
        }

      data = {
        ...data,
        password: await bcrypt.hash(data.password, 10),
      }

      await this.userRepository.create(data)
      return {
        code: 201,
        status: true,
        message: 'Usuário criado com sucesso!',
      }
    } catch (err) {
      console.log(err)

      return {
        code: err?.code || 500,
        status: false,
        message: err?.message || 'Internal server error',
      }
    }
  }

  async singIn(data: Partial<Users>): Promise<StatusProps> {
    try {
      const user = await this.userRepository.findUnique({ email: data.email })

      if (!user) {
        return {
          code: 404,
          status: false,
          message: 'Usuário não encontrado!',
        }
      }

      if (!(await bcrypt.compare(data.password, user.password))) {
        return {
          code: 400,
          status: false,
          message: 'Email ou Senha inválidos!',
        }
      }

      const now = Math.floor(Date.now() / 1000)

      const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
        iat: now,
        // exp: now + 60 * 60 * 24,
        exp: now + 60 * 10,
      }
      const key = 'mysecret'

      const token = jwt.sign(payload, key)

      return {
        code: 200,
        status: true,
        message: 'Usuário autenticado com sucesso!',
        data: {
          ...payload,
          token,
        },
      }
    } catch (error) {
      return {
        code: error?.code || 500,
        status: false,
        message: error?.message || 'Internal server error',
      }
    }
  }
}
