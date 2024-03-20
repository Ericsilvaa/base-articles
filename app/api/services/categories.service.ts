import { Categories } from '@prisma/client'
import CategoriesRepository from '@repositories/categories.repository'
import { StatusProps } from '@utils/apiReturn'

export default class CategoriesService {
  private categoryRepository = CategoriesRepository

  async createCategory(data: Partial<Categories>): Promise<StatusProps> {
    try {
      await this.categoryRepository.create(data)
      return {
        code: 201,
        status: true,
        message: 'Categoria criado com sucesso!',
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

  async updateCategory(data: Categories): Promise<StatusProps> {
    try {
      const category = await this.categoryRepository.findUnique({
        id: data.id,
      })

      if (!category) {
        return {
          code: 404,
          status: false,
          message: 'Categoria não encontrada!',
        }
      }

      const { id, ...dataUp } = data

      if (!dataUp.parentId) dataUp.parentId = null

      await this.categoryRepository.update({ id }, { ...dataUp })

      return {
        code: 200,
        status: true,
        message: 'Categoria atualizada com sucesso!',
      }
    } catch (err) {
      return {
        code: err?.code || 500,
        status: false,
        message: err?.message || 'Internal server error',
      }
    }
  }

  async removeCategory(id: string): Promise<StatusProps> {
    try {
      const category = await this.categoryRepository.findUnique({
        id,
      })

      if (category.parentId) {
        return {
          code: 400,
          status: false,
          message: 'Categoria não pode ser deletada, pois é subcategoria!',
        }
      }

      const articles = await this.categoryRepository.findUnique({
        articles: {
          some: {
            categoryId: id,
          },
        },
      })

      if (articles) {
        return {
          code: 404,
          status: false,
          message: 'Categoria não pode ser deleada, pois possui Artigos!',
        }
      }

      await this.categoryRepository.delete({ id })

      return {
        code: 204,
        status: true,
        message: '',
      }
    } catch (err) {
      return {
        code: err?.code || 500,
        status: false,
        message: err?.message || 'Internal server error',
      }
    }
  }

  async getCategories() {
    const categories = await this.categoryRepository.findAll()

    if (!categories.length)
      return {
        code: 404,
        status: false,
        message: 'Nenhuma categoria encontrada',
      }

    return {
      code: 200,
      status: true,
      message: '',
      data: this.witPathCategory(categories),
    }
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findUnique({ id })

    if (!category)
      return {
        code: 404,
        status: false,
        message: 'Nenhuma categoria encontrada',
      }

    return {
      code: 200,
      status: true,
      message: '',
      data: category,
    }
  }

  async getTreeCategories() {
    const categories = await this.categoryRepository.findAll()

    return {
      code: 200,
      status: true,
      message: '',
      data: this.categoryTree(categories, null),
    }
  }

  private witPathCategory = (categories: Categories[]) => {
    const categoryParent = (categories: Categories[], parentId: string) => {
      const filterParent = categories.filter((parent) => parent.id === parentId)
      return filterParent.length ? filterParent[0] : null
    }

    const categoriesWithPath = categories.map((category) => {
      let path = category.name
      let parent = categoryParent(categories, category.parentId)

      while (parent) {
        path = `${parent.name} > ${path}`
        parent = categoryParent(categories, parent.parentId)
      }

      return { ...category, path }
    })

    return categoriesWithPath.sort((a, b) => a.path.localeCompare(b.path))
  }

  // function transform array in structure tree
  private categoryTree = (categories: Categories[], tree: any) => {
    if (!tree) tree = categories.filter((c) => !c.parentId)
    tree = tree.map((parentNode: any) => {
      const isChild = (node: Categories) => node.parentId == parentNode.id
      parentNode.children = this.categoryTree(
        categories,
        categories.filter(isChild)
      )
      return parentNode
    })
    return tree
  }
}
