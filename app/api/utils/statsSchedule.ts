import { prisma } from '@database/index'
import { Stats } from '@prisma/client'
import schedule from 'node-schedule'

export async function StatsSchedule() {
  schedule.scheduleJob('*/1 * * * *', async () => {
    const categoriesCount = await prisma.categories.count()
    const articlesCount = await prisma.articles.count()

    const lastStats = await prisma.stats.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    const newStats: Omit<Stats, 'id'> = {
      authorId: '1',
      categories: categoriesCount,
      articles: articlesCount,
      createdAt: new Date(),
    }

    const changedCategories =
      !lastStats || newStats.categories !== lastStats.categories
    const changedArticles =
      !lastStats || newStats.articles !== lastStats.articles

    if (changedCategories || changedArticles) {
      await prisma.stats.create({ data: newStats })
    }
  })
}

export async function GenerateStatsSchedule(authorId: string) {
  try {
    const categoriesCount = await prisma.categories.count({
      where: { authorId },
    })

    const articlesCount = await prisma.articles.count({
      where: { authorId },
    })

    const lastStats = await prisma.stats.findFirst({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
    })

    const newStats: Omit<Stats, 'id'> = {
      authorId,
      categories: categoriesCount,
      articles: articlesCount,
      createdAt: new Date(),
    }

    const changedCategories =
      !lastStats || newStats.categories !== lastStats.categories
    const changedArticles =
      !lastStats || newStats.articles !== lastStats.articles

    if (changedCategories || changedArticles) {
      await prisma.stats.create({ data: newStats })
    }
  } catch (error) {
    console.error(error)
  }
}
