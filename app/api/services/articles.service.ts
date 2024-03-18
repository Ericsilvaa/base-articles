import { Articles } from '@prisma/client'
import ArticlesRepository from '@repositories/articles.repository'
import { StatusProps } from '@utils/apiReturn'

type ArticlesLimits = 10 | 20 | 50
export default class ArticlesService {
  protected articlesRepository = ArticlesRepository
  protected limit = 2

  async createArticles(data: Partial<Articles>): Promise<StatusProps> {
    try {
      await this.articlesRepository.create(data)
      return {
        code: 201,
        status: true,
        message: 'Artigo criado com sucesso!',
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

  async getArticles(data: { page?: number; limit?: ArticlesLimits }) {
    const page = data.page || 1
    const limit = +data.limit || this.limit
    const offset = page * limit - limit

    try {
      const articles = await this.articlesRepository.findMany(
        {},
        { skip: offset, take: limit }
      )

      if (!articles.length)
        return {
          code: 404,
          status: false,
          message: 'Nenhuma categoria encontrada',
        }

      return {
        code: 200,
        status: true,
        message: '',
        data: { articles, limit: this.limit, page, count: articles.length },
      }
    } catch (err) {
      return {
        code: err?.code || 500,
        status: false,
        message: err?.message || 'Internal server error',
      }
    }
  }

  async getArticlesById(id: string) {
    try {
      const articles: Articles | Partial<Articles> =
        await this.articlesRepository.findUnique({ id })

      if (!articles)
        return {
          code: 404,
          status: false,
          message: 'Nenhuma categoria encontrada',
        }

      return {
        code: 200,
        status: true,
        message: '',
        data: { ...articles, content: articles.content.toString() },
      }
    } catch (err) {
      return {
        code: err?.code || 500,
        status: false,
        message: err?.message || 'Internal server error',
      }
    }
  }

  async removeArticles(id: string): Promise<StatusProps> {
    try {
      await this.articlesRepository.delete({ id })

      return {
        code: 200,
        status: true,
        message: 'Artigo deletado com sucesso!',
      }
    } catch (err) {
      return {
        code: err?.code || 500,
        status: false,
        message: err?.message || 'Internal server error',
      }
    }
  }

  async updateArticles(data: Partial<Articles>): Promise<StatusProps> {
    const { id, ...content } = data

    try {
      const article = await this.articlesRepository.findUnique({ id })

      if (!article)
        return {
          code: 404,
          status: false,
          message: 'Artigo não encontrado',
        }

      await this.articlesRepository.update({ id }, content)

      return {
        code: 201,
        status: true,
        message: 'Artigo atualizado com sucesso!',
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

  // getArticleByCategory = async (data: any) => {
  // const page = data.page || 1
  // const limit = data.limit || this.limit
  // const offset = page * limit - limit
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
