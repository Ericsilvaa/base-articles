import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const createCategoryValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(30).required().messages({
      'any.required': 'Informe o nome do Categoria',
      'string.min': 'O nome do Categoria deve ter no mínimo 3 caracteres',
      'string.max': 'O nome do Categoria deve ter no máximo 100 caracteres',
      'string.empty': 'O nome do Categoria não pode estar vazio',
    }),
    parentId: Joi.string().allow(null, ''),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}
