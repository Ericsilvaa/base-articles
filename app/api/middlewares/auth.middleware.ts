import { NextFunction, Request, Response } from 'express'
import { JwtPayload, decode, verify } from 'jsonwebtoken'

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = req.cookies['jwt']
    const payload: any = verify(jwt, 'mysecret')

    if (!payload) {
      return res.status(401).send({
        message: 'Auth Unauthenticated',
      })
    }

    const decodeJwt = decode(jwt) as JwtPayload

    req.user = {
      id: decodeJwt.sub,
      email: decodeJwt.email,
      role: decodeJwt.role,
    }

    return next()
  } catch (error) {
    return res.status(401).send({
      message: 'auth Unauthenticated',
    })
  }
}
