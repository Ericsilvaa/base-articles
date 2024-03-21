import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const singInValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required().messages({
      'any.required': 'O E-mail é obrigatório',
      'string.email': 'E-mail inválido',
      'string.empty': 'O E-mail não pode estar vazio',
    }),
    password: Joi.string().required().messages({
      'any.required': 'A senha é obrigatória',
      'string.empty': 'A senha não pode estar vazia',
    }),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}

export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(20).required().messages({
      'any.required': 'Informe seu nome',
      'string.alphanum': 'O nome deve conter apenas letras e/ou números',
      'string.min': 'O nome deve ter no mínimo 3 caracteres',
      'string.max': 'O nome deve ter no máximo 20 caracteres',
      'string.empty': 'O nome não pode estar vazio',
    }),
    email: Joi.string()
      .trim()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'br'] } })
      .required()
      .messages({
        'any.required': 'O E-mail é obrigatório',
        'string.email': 'E-mail inválido',
        'string.empty': 'O E-mail não pode estar vazio',
      }),
    password: Joi.string().min(4).required().messages({
      'any.required': 'A senha é obrigatória',
      'string.min': 'A senha deve ter no mínimo 4 caracteres',
      'string.empty': 'A senha não pode estar vazia',
    }),
    password_confirm: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .messages({
        'any.required': 'A confirmação da senha é obrigatória',
        'any.only': 'As senhas não coincidem',
        'string.empty': 'Confirme a senha',
      }),
  })

  const { error } = schema.validate(req.body)

  if (error) {
    return res.status(400).json({ error: error.details[0].message })
  }

  next()
}
