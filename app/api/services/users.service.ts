import { Users } from '@prisma/client'
import bcrypt from 'bcrypt'

import UsersRepository from '@repositories/users.repository'

import { StatusProps } from '@utils/apiReturn'

type FileMulter = Express.Multer.File & {
  location: string
  key: string
  url: string
}

export class UsersServices {
  protected userRepository = UsersRepository

  async findUserById(id: string): Promise<StatusProps> {
    try {
      const user = await this.userRepository.findUnique({ id })
      Reflect.deleteProperty(user, 'password')

      return {
        code: 200,
        status: true,
        message: 'Usuário encontrado com sucesso!',
        data: { ...user },
      }
    } catch (error) {
      return {
        code: error?.code || 500,
        status: false,
        message: error?.message || 'Internal server error',
      }
    }
  }

  async updateUser({ id, profile, ...userData }: Users): Promise<StatusProps> {
    try {
      const user = await this.userRepository.findUnique({
        id,
      })

      if (!user) {
        return {
          code: 404,
          status: false,
          message: 'Usuário não encontrado!',
        }
      }

      const newUser = {
        ...userData,
      }

      if (profile) {
        newUser['profile'] = {}
        if (profile.bio) {
          newUser['profile']['bio'] = user.profile.bio = profile.bio
        }
        if (profile.address) {
          newUser['profile']['address'] = {
            ...user.profile.address,
            ...profile.address,
          }
        }
      }

      console.log('🚀 ~ UsersServices ~ updateUser ~ newUser:', newUser)
      await this.userRepository.update({ id }, newUser)

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
