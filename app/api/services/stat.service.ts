import StatsRepository from '@repositories/stat.repository'
import { GenerateStatsSchedule } from '@utils/statsSchedule'

export class StatsServices {
  protected statsRepository = StatsRepository

  async createStat() {
    try {
      await GenerateStatsSchedule()

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

  async getStats() {
    try {
      const Stats = await this.statsRepository.findMany(
        {},
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
