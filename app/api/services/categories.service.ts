import { Categories } from '@prisma/client'
import CategoriesRepository from '../../repository/categories'
import { StatusProps } from '@utils/apiReturn'

export default class CategoriesService {
  protected categoryRepository = CategoriesRepository

  async createCategory(data: Partial<Categories>): Promise<StatusProps> {
    try {
      const categoryExist = await this.categoryRepository.findOne({
        name: data.name,
      })

      if (categoryExist)
        return {
          code: 401,
          status: false,
          message: 'categoria já cadastrada!',
        }

      console.log('🚀 ~ CategoriesService ~ createCategory ~ data:', data)

      await this.categoryRepository.create({ name: data.name, ...data })
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

  async updateCategory(data: Categories): Promise<StatusProps> {
    try {
      const category = await this.categoryRepository.findOne({
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
      const category = await this.categoryRepository.findOne({
        id,
      })

      if (category.parentId) {
        return {
          code: 400,
          status: false,
          message: 'Categoria não pode ser deletada, pois é subcategoria!',
        }
      }

      const articles = await this.categoryRepository.findOne({
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
    const { rows } = await this.categoryRepository.findAll({})

    if (!rows.length)
      return {
        code: 404,
        status: false,
        message: 'Nenhuma categoria encontrada',
      }

    return {
      code: 200,
      status: true,
      message: '',
      data: this.witPathCategory(rows),
    }
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findOne({ id })

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
    const { rows } = await this.categoryRepository.findAll({})

    return {
      code: 200,
      status: true,
      message: '',
      // data:
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
    if (!tree) {
      tree = categories.filter((c) => !c.parentId)
      tree = categories.map((parent: Categories & { children: Categories }) => {
        const isChild = (node: Categories) => node.parentId === parent.id

        parent.children = this.categoryTree(
          categories,
          categories.filter(isChild)
        )

        return parent
      })
      return tree
    }
  }
}
