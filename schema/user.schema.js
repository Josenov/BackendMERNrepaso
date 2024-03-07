import Joi from "joi"

export const createUserSchema = Joi.object({
    email:Joi.string().required().email({
        minDomainSegments:2
    })
    .messages({
        'any.required': 'El email es obligatorio'
    }),
    password:Joi.string().required()
    .min(6)
    .max(20)
    .alphanum()
    .messages({
        'any.required': 'Contraseña de 6 a 20 caracteres obligatorio'
    }),
    name:Joi.string().required()
    .min(2)
    .max(20)
    .messages({
        'any.required': 'Nombre de 2 a 20 caracteres obligatorio'
    }),
    //.regex()
    image:Joi.string().required()
    .uri()
    .messages({
        'any.required': 'URL no valida'
    })
})

export const signInUserSchema = Joi.object({
    email:Joi.string().required().email({
        minDomainSegments:2
    })
    .messages({
        'any.required': 'El email es obligatorio'
    }),
    password:Joi.string().required()
    .min(6)
    .max(20)
    .alphanum()
    .messages({
        'any.required': 'Contraseña de 6 a 20 caracteres obligatorio'
    })
    
})

