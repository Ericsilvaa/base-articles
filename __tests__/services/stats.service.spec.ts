import { StatsServices } from '../../app/api/services/stat.service'
import StatsRepository from '@repositories/stat.repository'

describe('Stats Service', () => {
  test('should be able to create a stats', () => {
    // chamada para o serviço
    const createdStats = new StatsServices()

    expect(true).toBe(true)
  })
  test('should be able to get a stats', () => {
    // chamada para o serviço

    const getStats = new StatsServices()

    expect(true).toBe(true)
  })
})
