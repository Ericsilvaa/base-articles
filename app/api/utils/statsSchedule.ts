import { prisma } from '@database/index'
import { Stats } from '@prisma/client'
import schedule from 'node-schedule'

export async function StatsSchedule() {
  schedule.scheduleJob('*/1 * * * *', async () => {
    const usersCount = await prisma.users.count()
    const categoriesCount = await prisma.categories.count()
    const articlesCount = await prisma.articles.count()

    const lastStats = await prisma.stats.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    const newStats: Omit<Stats, 'id'> = {
      users: usersCount,
      categories: categoriesCount,
      articles: articlesCount,
      createdAt: new Date(),
    }

    const changedUsers = !lastStats || newStats.users !== lastStats.users
    const changedCategories =
      !lastStats || newStats.categories !== lastStats.categories
    const changedArticles =
      !lastStats || newStats.articles !== lastStats.articles

    if (changedUsers || changedCategories || changedArticles) {
      await prisma.stats.create({ data: newStats })
    }
  })
}

export async function GenerateStatsSchedule() {
  try {
    const usersCount = await prisma.users.count()
    const categoriesCount = await prisma.categories.count()
    const articlesCount = await prisma.articles.count()

    const lastStats = await prisma.stats.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    const newStats: Omit<Stats, 'id'> = {
      users: usersCount,
      categories: categoriesCount,
      articles: articlesCount,
      createdAt: new Date(),
    }

    const changedUsers = !lastStats || newStats.users !== lastStats.users
    const changedCategories =
      !lastStats || newStats.categories !== lastStats.categories
    const changedArticles =
      !lastStats || newStats.articles !== lastStats.articles

    if (changedUsers || changedCategories || changedArticles) {
      await prisma.stats.create({ data: newStats })
    }
  } catch (error) {
    console.error(error)
  }
}
