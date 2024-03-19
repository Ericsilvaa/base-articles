import { Articles } from '@prisma/client'
import { StatusProps } from '@utils/apiReturn'

import ArticlesRepository from '@repositories/articles.repository'
import CategoryRepository from '@repositories/categories.repository'
import { prisma } from '@database/index'

type FileMulter = Array<
  Express.Multer.File & { location: string; key: string; url: string }
>

type ArticlesLimits = 2 | 5 | 10 | 20 | 50

type ArticlesDataProps = {
  id?: string
  page?: number
  limit?: ArticlesLimits
}
export default class ArticlesService {
  protected limit = 2
  protected articlesRepository = ArticlesRepository
  protected categoryRepository = CategoryRepository

  async createArticles({
    file,
    articles,
  }: {
    file: FileMulter
    articles: Articles
  }): Promise<StatusProps> {
    try {
      if (file.length > 0) {
        const create_article = await prisma.articles.create({
          data: {
            ...articles,
            images: {
              create: file.map((img) => ({
                name: img.originalname,
                url: img.url || img.location,
                size: img.size,
                key: img.key,
              })),
            },
          },
        })

        return {
          code: 201,
          status: true,
          message: 'Artigo criado com sucesso!',
          data: { ...create_article },
        }
      }

      const article = await this.articlesRepository.create(articles)

      return {
        code: 201,
        status: true,
        message: 'Artigo criado com sucesso!',
        data: { ...article },
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
    const page = +data.page || 1
    const per_page = +data.limit || this.limit
    const offset = page * per_page - per_page

    try {
      const { data, count } = await this.articlesRepository.findAll(
        {
          skip: offset,
          take: per_page,
        },
        {
          author: { select: { name: true } },
          images: {
            select: { name: true, id: true, createdAt: true, size: true },
          },
        }
      )

      if (!data.length)
        return {
          code: 404,
          status: false,
          message: 'Nenhuma categoria encontrada',
        }

      return {
        code: 200,
        status: true,
        message: '',
        data: {
          data,
          limit: this.limit,
          page,
          count,
          last_page: Math.ceil(count / per_page),
        },
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
        await this.articlesRepository.findUnique(
          { id },
          { include: { images: true, author: { select: { name: true } } } }
        )

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
        data: { ...articles },
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
    const page = +data.page || 1
    const limit = +data.limit || this.limit
    const offset = page * limit - limit

    try {
      const categories = await this.fetchCategoriesWithChildren(data.id)

      if (!Array.isArray(categories)) {
        return categories
      } else if (!categories.length) {
        return {
          code: 404,
          status: false,
          message: 'Nenhuma categoria encontrada',
        }
      }

      const ids: string[] = categories.map((c) => c.id)

      const articles = await this.fetchArticlesWithUsers(ids, offset, limit)

      if (!Array.isArray(articles)) {
        return articles
      } else if (!articles.length) {
        return {
          code: 404,
          status: false,
          message: 'Nenhum artigo encontrado',
        }
      }

      return {
        code: 200,
        status: true,
        message: '',
        data: { articles, limit, page },
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
      const articlesWithUsers = await this.articlesRepository.findMany(
        { categoryId: { in: ids } },
        {
          id: true,
          name: true,
          description: true,
          tub_img: true,
          author: { select: { name: true } },
        },
        { take: limit, skip: offset, orderBy: { id: 'desc' } }
      )

      return articlesWithUsers
    } catch (error) {
      return {
        code: error?.code || 500,
        status: false,
        message: error?.message || 'Internal server error',
      }
    }
  }

  private async fetchCategoriesWithChildren(id: string) {
    try {
      // Buscar a categoria principal pelo ID
      const mainCategory = await this.categoryRepository.findUnique({ id })

      // Buscar as subcategorias com base no ID da categoria principal
      const subcategories = await this.categoryRepository.findManyWithWhere({
        parentId: id,
      })

      // Combina a categoria principal com as subcategorias
      return [mainCategory, ...subcategories]
    } catch (error) {
      return {
        code: error?.code || 500,
        status: false,
        message: error?.message || 'Internal server error',
      }
    }
  }
}
