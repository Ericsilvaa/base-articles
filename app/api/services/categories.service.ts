import { Categories } from '@prisma/client'
import CategoriesRepository from '@repositories/categories.repository'
import { StatusProps } from '@utils/apiReturn'

export default class CategoriesService {
  protected categoryRepository: CategoriesRepository

  constructor() {
    this.categoryRepository = new CategoriesRepository()
  }

  async createCategory(data: any): Promise<StatusProps> {
    // se eu tiver um id no data, estou pegando pelos parametros, quero atualizar, se não, estou querendo criar
    try {
      const categoryExist = await this.categoryRepository.findUnique({
        name: data.name,
      })

      if (categoryExist)
        return {
          code: 404,
          status: false,
          message: 'categoria já cadastrada, Por favor escolha outro email!',
        }

      await this.categoryRepository.saveUser(data)
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

  async removeCategory(data: any): Promise<StatusProps> {
    try {
      const subCategory = await this.categoryRepository.findById({
        parentId: data.id,
      })

      if (subCategory) {
        return {
          code: 404,
          status: false,
          message:
            'Categoria não pode ser deletado, pois possui subcategorias!',
        }
      }

      const articles = await this.categoryRepository.findUnique({
        categoryId: data.id,
      })

      if (articles) {
        return {
          code: 404,
          status: false,
          message:
            'Categoria não pode ser deletado, pois possui subcategorias!',
        }
      }

      await this.categoryRepository.delete({ id: data.id })

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

  getCategories = async () => {
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

  getCategoryById = async (id: string) => {
    const category = await this.categoryRepository.findById({ id })

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

  getTreeCategories = async () => {
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
      data: await this.categoryTree(this.witPathCategory(categories), null),
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
  private categoryTree = async (categories: any, tree: any) => {
    if (!tree) {
      tree = categories.filter((c: any) => !c.parentId)
      tree = tree.map((parent: any) => {
        const isChild = (node: any) => node.parentId === parent.id
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
