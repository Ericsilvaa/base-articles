import { StatsServices } from '@services/stat.service'
import { StatsController } from './stats.controller'
import { StatsRepository } from '@repositories/stat.repository'

const statsRepository = new StatsRepository()
const statsServices = new StatsServices(statsRepository)
const statsController = new StatsController(statsServices)

export default statsController
