import { prisma } from '@database/index'
import { Articles } from '@prisma/client'
import { StatusProps } from '@utils/apiReturn'

import { ArticlesRepository } from '@repositories/articles.repository'
import { CategoriesRepository } from '@repositories/categories.repository'

type FileMulter = Array<
  Express.Multer.File & { location: string; key: string; url: string }
>

type ArticlesLimits = 2 | 5 | 10 | 20 | 50

type ArticlesDataProps = {
  id?: string
  page?: number
  limit?: ArticlesLimits
  authorId?: string
}
export class ArticlesServices {
  private limit = 2
  private articlesRepository: ArticlesRepository
  private categoryRepository: CategoriesRepository

  constructor(
    articlesRepository: ArticlesRepository,
    categoryRepository: CategoriesRepository
  ) {
    this.articlesRepository = articlesRepository
    this.categoryRepository = categoryRepository
  }

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
            tub_img: file[0].url,
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
      const { dataArticle, count } = await this.articlesRepository.findAll(
        { authorId: data.authorId },
        {
          skip: offset,
          take: per_page,
        },
        {
          author: { select: { name: true } },
          images: {
            select: { name: true, id: true, key: true, size: true, url: true },
          },
        }
      )

      if (!dataArticle.length)
        return {
          code: 200,
          status: true,
          message: 'Nenhum Artigo registrado',
        }

      return {
        code: 200,
        status: true,
        message: '',
        data: {
          articles: dataArticle,
          limit: per_page,
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

  async getArticlesById({
    id,
    authorId,
  }: {
    id: string
    authorId: string
  }): Promise<StatusProps> {
    try {
      const articles: Articles | Partial<Articles> =
        await this.articlesRepository.findUnique(
          { id, authorId },
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

  async removeArticles({
    id,
    authorId,
  }: {
    id: string
    authorId: string
  }): Promise<StatusProps> {
    try {
      await this.articlesRepository.delete({ id, authorId })

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
    const { id, authorId, ...content } = data

    try {
      const article = await this.articlesRepository.findUnique({ id, authorId })

      if (!article)
        return {
          code: 404,
          status: false,
          message: 'Artigo não encontrado',
        }

      await this.articlesRepository.update({ id, authorId }, content)

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
      const categories = await this.fetchCategoriesWithChildren({
        id: data.id,
        authorId: data.authorId,
      })

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

      const articles = await this.fetchArticlesWithCategories(
        ids,
        offset,
        limit
      )

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

  private async fetchArticlesWithCategories(
    ids: string[],
    offset: number,
    limit: number
  ) {
    try {
      const articlesWith = await this.articlesRepository.findMany(
        { categoryId: { in: ids } },
        {
          id: true,
          name: true,
          description: true,
          tub_img: true,
          content: true,
          categoryId: true,
          author: { select: { name: true } },
          images: {
            select: { name: true, id: true, key: true, size: true, url: true },
          },
        },
        { take: limit, skip: offset, orderBy: { id: 'desc' } }
      )

      return articlesWith
    } catch (error) {
      return {
        code: error?.code || 500,
        status: false,
        message: error?.message || 'Internal server error',
      }
    }
  }

  private async fetchCategoriesWithChildren({
    id,
    authorId,
  }: {
    id: string
    authorId: string
  }) {
    try {
      // Buscar a categoria principal pelo ID
      const mainCategory = await this.categoryRepository.findUnique({
        id,
        authorId,
      })

      if (!mainCategory) {
        return {
          code: 404,
          status: false,
          message: 'Nenhuma categoria encontrada',
        }
      }

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
