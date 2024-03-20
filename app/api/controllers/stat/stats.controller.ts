import { StatsServices } from '@services/stat.service'
import { Request, Response } from 'express'

export class StatsController {
  protected statsServices: StatsServices

  constructor(statsServices: StatsServices) {
    this.statsServices = statsServices
  }

  async createStat(req: Request, res: Response) {
    const response = await this.statsServices.createStat()
    return res.status(200).json({ ...response })
  }

  async getStats(req: Request, res: Response) {
    const response = await this.statsServices.getStats()
    return res.status(200).json({ ...response })
  }
}
