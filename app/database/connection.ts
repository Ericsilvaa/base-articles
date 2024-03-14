import PrismaConnection from './DataSource'

const prismaConnection = new PrismaConnection()

async function startApp() {
  try {
    await prismaConnection.connect()
    // Fazer operações com o Prisma aqui
  } catch (error) {
    console.log('Erro ao conectar com o banco de dados', error)
    // Lidar com erros de conexão
  }
  // finally {
  //   await prismaConnection.disconnect()
  // }
}

export default startApp
