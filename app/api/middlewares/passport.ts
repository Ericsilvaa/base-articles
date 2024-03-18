import { prisma } from '@database/index'

import passport from 'passport'
import passportJwt from 'passport-jwt'

const { Strategy, ExtractJwt } = passportJwt

export default class AuthPassport {
  public static authJwt() {
    const params = {
      secretOrKey: 'mysecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }

    const fnStrategy = async (payload: any, done: any) => {
      try {
        const user = await prisma.users.findUnique({
          where: { email: payload.email },
        })

        return done(null, user ? { ...payload } : false)
      } catch (error) {
        return done(error, false)
      }
    }

    const strategy = new Strategy(params, fnStrategy)

    passport.use(strategy)

    return {
      authenticate: () => passport.authenticate('jwt', { session: false }),
    }
  }
}
