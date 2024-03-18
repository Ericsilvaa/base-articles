import { NextFunction, Request, Response } from 'express'
import jwt from 'jwt-simple'

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body || null
  const key = 'mysecret'
  try {
    if (userData) {
      const token = jwt.decode(userData.token, key)

      if (new Date(token.exp * 1000) > new Date()) {
        // poderia renovar o token aqui

        next()
      }
    }
  } catch (error) {
    return res.status(401).send('Token inválido')
  }
}
