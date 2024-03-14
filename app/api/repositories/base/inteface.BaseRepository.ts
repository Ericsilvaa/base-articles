export interface IBaseRepository<T> {
  save(data: T): Promise<void>
  findById(data: T): Promise<any>
  findUnique(query: string): any
  update(query: T, data: any): Promise<void>
  delete(data: T): Promise<void>
  findAll(): Promise<T[]>
}
