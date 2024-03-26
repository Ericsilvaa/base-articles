import { NextFunction, Request, Response } from 'express'
import { JwtPayload, decode, verify } from 'jsonwebtoken'

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jwt = req.headers.cookie.split('=')[1]
    const payload: any = verify(jwt, 'mysecret')

    if (!payload) {
      return res.status(401).send({
        message: 'Usuario não Autenticado',
      })
    }

    const decodeJwt = decode(jwt) as JwtPayload

    req.user = {
      id: decodeJwt.id,
      // email: decodeJwt.email,
      // role: decodeJwt.role,
    }

    return next()
  } catch (error) {
    return res.status(401).send({
      message: 'Usuario não Autenticado',
    })
  }
}
