import { Articles, PrismaClient } from '@prisma/client'
import { StatusProps } from '@utils/apiReturn'

import ArticlesRepository from '@repositories/articles.repository'
import CategoryRepository from '@repositories/categories.repository'

type ArticlesLimits = 2 | 5 | 10 | 20 | 50

type ArticlesDataProps = {
  id?: string
  page?: number
  limit?: ArticlesLimits
}
const prisma = new PrismaClient()
export default class ArticlesService {
  protected limit = 2
  protected articlesRepository = ArticlesRepository
  protected categoryRepository = CategoryRepository

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

  async getArticles(data: ArticlesDataProps) {
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

  async getArticleByCategory(data: ArticlesDataProps) {
    const page = data.page || 1
    const limit = +data.limit || this.limit
    const offset = page * limit - limit

    try {
      const categories = await this.fetchCategoriesWithChildren(data.id)

      if (!categories.length)
        return {
          code: 404,
          status: false,
          message: 'Nenhuma categoria encontrada',
        }

      const ids: string[] = categories.map((c) => c.id)

      const articles = await this.fetchArticlesWithUsers(ids, offset, limit)

      if (!articles.length)
        return {
          code: 404,
          status: false,
          message: 'Nenhum artigo encontrado',
        }

      return {
        code: 200,
        status: true,
        message: '',
        data: { articles, limit: this.limit, page, count: articles.length },
      }
    } catch (error) {
      return {
        code: error?.code || 500,
        status: false,
        message: error?.message || 'Internal server error',
      }
    }
  }

  private async fetchArticlesWithUsers(
    ids: string[],
    offset: number,
    limit: number
  ) {
    try {
      const articlesWithUsers = await prisma.articles.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          imageUrl: true,
          author: { select: { name: true } },
        },
        take: limit,
        skip: offset,
        where: { categoryId: { in: ids } },
        orderBy: { id: 'desc' },
      })

      return articlesWithUsers
    } catch (error) {
      console.error('Error fetching articles with users:', error)
      throw error
    }
  }

  private async fetchCategoriesWithChildren(id: string) {
    try {
      // Buscar a categoria principal pelo ID
      const mainCategory = await this.categoryRepository.findUnique({ id })

      // Buscar as subcategorias com base no ID da categoria principal
      const subcategories = await this.categoryRepository.findMany(
        {
          parentId: id,
        },
        {}
      )

      // Combina a categoria principal com as subcategorias
      const categoriesWithChildren = [mainCategory, ...subcategories]

      return categoriesWithChildren
    } catch (error) {
      console.error('Error fetching categories with children:', error)
      throw error
    }
  }
}
