import { StatsServices } from '@services/stat.service'
import { StatsController } from './stats.controller'

const statsServices = new StatsServices()
const statsController = new StatsController(statsServices)

export default statsController
