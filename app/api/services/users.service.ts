import { Users } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jwt-simple'

import UsersRepository from '@repositories/users.repository'

import { StatusProps } from '@utils/apiReturn'

type FileMulter = Express.Multer.File & {
  location: string
  key: string
  url: string
}

export interface IUser {
  id?: string
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default class UsersService {
  protected userRepository = UsersRepository

  async createUser(data: IUser): Promise<StatusProps> {
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
        password: this.encryptPassword(data.password),
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

      const isMatch = bcrypt.compareSync(data.password, user.password)

      if (!isMatch) {
        return {
          code: 401,
          status: false,
          message: 'Email ou Senha inválidos!',
        }
      }

      const now = Math.floor(Date.now() / 1000)

      const payload = {
        id: user.id,
        email: user.email,
        iat: now,
        // exp: now + 60 * 60 * 24,
        exp: now + 60 * 10,
      }
      const key = 'mysecret'

      const token = jwt.encode(payload, key)

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

  async updateUser({ id, ...userData }: Users): Promise<StatusProps> {
    try {
      const user = await this.userRepository.findUnique({ id })

      if (!user) {
        return {
          code: 404,
          status: false,
          message: 'Usuário não encontrado!',
        }
      }

      await this.userRepository.update({ id }, userData)

      return {
        code: 200,
        status: true,
        message: 'Usuário atualizado com sucesso!',
      }
    } catch (error) {
      return {
        code: error?.code || 500,
        status: false,
        message: error?.message || 'Internal server error',
      }
    }
  }

  async updateProfilePhoto(
    id: string,
    photo: FileMulter
  ): Promise<StatusProps> {
    try {
      const user = await this.userRepository.findUnique({ id })

      if (!user) {
        return {
          code: 404,
          status: false,
          message: 'Usuário não encontrado!',
        }
      }

      const newPhoto = {
        name: photo.originalname,
        url: photo.url || photo.location,
        size: photo.size,
        key: photo.key,
        createdAt: new Date(),
      }

      await this.userRepository.update({ id }, { photo: newPhoto })

      return {
        code: 200,
        status: true,
        message: 'Foto atualizada com sucesso!',
      }
    } catch (error) {
      return {
        code: error?.code || 500,
        status: false,
        message: error?.message || 'Internal server error',
      }
    }
  }

  private encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }
}
