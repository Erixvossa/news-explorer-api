const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле "password" должно быть заполнено',
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле "name" должно быть заполнено',
        'string.empty': 'Поле "name" должно быть заполнено',
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
        'string.empty': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле "password" должно быть заполнено',
        'string.empty': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'any.required': 'Поле "keyword" должно быть заполнено',
        'string.empty': 'Поле "keyword" должно быть заполнено',
      }),
    title: Joi.string().required()
      .messages({
        'any.required': 'Поле "title" должно быть заполнено',
        'string.empty': 'Поле "title" должно быть заполнено',
      }),
    text: Joi.string().required()
      .messages({
        'any.required': 'Поле "text" должно быть заполнено',
        'string.empty': 'Поле "text" должно быть заполнено',
      }),
    date: Joi.string().required()
      .messages({
        'any.required': 'Поле "date" должно быть заполнено',
        'string.empty': 'Поле "date" должно быть заполнено',
      }),
    source: Joi.string().required()
      .messages({
        'any.required': 'Поле "source" должно быть заполнено',
        'string.empty': 'Поле "source" должно быть заполнено',
      }),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "link" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "link" должно быть заполнено',
        'string.empty': 'Поле "link" должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "image" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
        'string.empty': 'Поле "image" должно быть заполнено',
      }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

module.exports = {
  validateUserBody,
  validateAuthentication,
  validateArticleBody,
  validateArticleId,
};
