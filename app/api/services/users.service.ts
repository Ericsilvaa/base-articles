import UsersRepository from '@repositories/users.repository'
import { StatusProps } from '@utils/apiReturn'
import bcrypt from 'bcrypt'

export interface IUser {
  id?: string
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default class UsersService {
  protected userRepository: UsersRepository

  constructor() {
    this.userRepository = new UsersRepository()
  }

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

      await this.userRepository.save(data)
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

  private encryptPassword(password: string) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }
}
