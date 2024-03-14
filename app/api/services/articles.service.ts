import ArticlesRepository from '@repositories/articles.repository'
import { StatusProps } from '@utils/apiReturn'

export default class ArticlesService {
  protected articlesRepository: ArticlesRepository
  protected limit = 10

  constructor() {
    this.articlesRepository = new ArticlesRepository()
  }

  async createArticles(data: any): Promise<StatusProps> {
    try {
      const ArticlesExist = await this.articlesRepository.findUnique({
        name: data.name,
      })

      if (ArticlesExist)
        return {
          code: 404,
          status: false,
          message: 'categoria já cadastrada, Por favor escolha outro email!',
        }

      await this.articlesRepository.save(data)
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

  // async removeArticles(data: any): Promise<StatusProps> {
  //   try {
  //     await this.articlesRepository.delete({ id: data.id })
  //     return {
  //       code: 200,
  //       status: true,
  //       message: 'Artigo deletado com sucesso!',
  //     }
  //   } catch (err) {
  //     return {
  //       code: err?.code || 500,
  //       status: false,
  //       message: err?.message || 'Internal server error',
  //     }
  //   }
  // }

  // getArticles = async (data: any) => {
  //   const page = data.page || 1

  //   try {
  //     // saber quantos artigos existem no banco
  //     // const articlesCount = await this.articlesRepository.count(data.id)

  //     const articles = await this.articlesRepository.findAll({ id: data.id })
  //     // .limit(this.limit).offset((page * this.limit) - this.limit)

  //     if (!articles.length)
  //       return {
  //         code: 404,
  //         status: false,
  //         message: 'Nenhum artigo encontrado',
  //       }

  //     return {
  //       code: 200,
  //       status: true,
  //       message: '',
  //       data: { articles, count: 10, limit: this.limit },
  //     }
  //   } catch (error) {
  //     return {
  //       code: error?.code || 500,
  //       status: false,
  //       message: error?.message || 'Internal server error',
  //     }
  //   }
  // }

  // getArticlesById = async (id: string) => {
  //   try {
  //     const articles = await this.articlesRepository.findById({ id })

  //     if (!articles)
  //       return {
  //         code: 404,
  //         status: false,
  //         message: 'Nenhuma categoria encontrada',
  //       }

  //     return {
  //       code: 200,
  //       status: true,
  //       message: '',
  //       data: { ...articles, content: articles.content.toString() },
  //     }
  //   } catch (error) {
  //     return {
  //       code: error?.code || 500,
  //       status: false,
  //       message: error?.message || 'Internal server error',
  //     }
  //   }
  // }

  // getArticleByCategory = async (data: any) => {
  //   const categoryId = data.categoryId
  //   const page = data.page || 1
  //   // const categories = await this.categoryRepository.findAll()
  //   // const ids = categories.map(c => c.id)

  //   try {
  //     // consulta deve ser feita em duas tabelas: articles e users
  //     // colocar limit e offset
  //   } catch (error) {
  //     return {
  //       code: error?.code || 500,
  //       status: false,
  //       message: error?.message || 'Internal server error',
  //     }
  //   }

  //   if (!categories.length)
  //     return {
  //       code: 404,
  //       status: false,
  //       message: 'Nenhuma categoria encontrada',
  //     }

  //   return {
  //     code: 200,
  //     status: true,
  //     message: '',
  //     data: await this.categoryTree(this.witPathCategory(categories), null),
  //   }
  // }
}
