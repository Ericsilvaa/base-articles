import { prisma } from '@database/index'
import passport from 'passport'
import passportJwt from 'passport-jwt'

const { Strategy, ExtractJwt } = passportJwt

export default class AuthPassport {
  public static authJwt() {
    const params = {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    }

    const strategy = new Strategy(params, async (payload: any, done: any) => {
      try {
        const user = await prisma.users.findUnique({
          where: { id: payload.id },
        })

        return done(null, user ? { ...payload } : false)
      } catch (error) {
        return done(error, false)
      }
    })

    passport.use(strategy).authenticate('jwt', { session: false })
  }
}
