import { prisma } from '@database/index'

import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import bcrypt from 'bcrypt'

export default passport.use(
  new Strategy(
    {
      secretOrKey: 'mysecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        if (!payload.user.email || !payload.user.password) {
          return done(null, false, {
            message: 'Email e senha são obrigatórios',
          })
        }

        const user = await prisma.users.findFirst({
          where: {
            email: payload.user.email,
          },
        })

        if (!user) {
          return done(null, false, { message: 'Usuário não encontrado' })
        }

        if (!bcrypt.compareSync(payload.user.password, user.password)) {
          return done(null, false, { message: 'Senha inválida' })
        }

        return done(null, user)
      } catch (error) {
        return done(error, false)
      }
    }
  )
)
