import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const createArticleValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required().messages({
      'any.required': 'Informe o nome do artigo',
      'string.min': 'O nome do artigo deve ter no mínimo 3 caracteres',
      'string.max': 'O nome do artigo deve ter no máximo 100 caracteres',
      'string.empty': 'O nome do artigo não pode estar vazio',
    }),
    description: Joi.string().trim().min(3).required().messages({
      'any.required': 'Informe a descrição do artigo',
      'string.min': 'A descrição do artigo deve ter no mínimo 3 caracteres',
      'string.empty': 'A descrição do artigo não pode estar vazia',
    }),
    content: Joi.string().trim().min(3).required().messages({
      'any.required': 'Informe o conteúdo do artigo',
      'string.min': 'O conteúdo do artigo deve ter no mínimo 3 caracteres',
      'string.empty': 'O conteúdo do artigo não pode estar vazio',
    }),
    categoryId: Joi.string().trim().required().messages({
      'any.required': 'Informe a categoria do artigo',
      'string.empty': 'A categoria do artigo não pode estar vazia',
    }),
  })

  console.log('🚀 ~ req.body):', req.body)
  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}
