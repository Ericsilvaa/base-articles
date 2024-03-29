import { StatsRepository } from '@repositories/stat.repository'
import { GenerateStatsSchedule } from '@utils/statsSchedule'

export class StatsServices {
  private statsRepository: StatsRepository

  constructor(statsRepository: StatsRepository) {
    this.statsRepository = statsRepository
  }

  async createStat(authorId: string) {
    try {
      await GenerateStatsSchedule(authorId)

      return {
        code: 201,
        status: true,
        message: 'Estatísticas criadas com sucesso!',
      }
    } catch (error) {
      return {
        code: error?.code || 500,
        status: false,
        message: error?.message || 'Internal server error',
      }
    }
  }

  async getStats(authorId: string) {
    try {
      const Stats = await this.statsRepository.findMany(
        { authorId },
        { orderBy: { createdAt: 'desc' } }
      )
      return {
        code: 200,
        status: true,
        message: 'Estatísticas retornadas com sucesso!',
        data: Stats[0],
      }
    } catch (error) {
      return {
        code: error?.code || 500,
        status: false,
        message: error?.message || 'Internal server error',
      }
    }
  }
}
