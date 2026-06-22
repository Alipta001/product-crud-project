const joi = require('joi');


const productValidation=joi.object({
    name: joi.string().required().min(3).max(50).messages({
        'string.base': 'Name should be a string',
        'string.empty': 'Name is required'
    }),
    price: joi.number().required().positive().messages({
        'number.base': 'Price should be a number',
        'number.empty': 'Price is required',
        'number.positive': 'Price should be a positive number'
    }),
    brand: joi.string().required().min(2).max(100).messages({
        'string.base': 'Brand should be a string',
        'string.empty': 'Brand is required'
    }),
    stock: joi.number().required().integer().min(0).messages({
        'number.base': 'Stock should be a number',
        'number.empty': 'Stock is required',
        'number.integer': 'Stock should be an integer'
    }),
    category: joi.string().required().min(2).max(100).messages({
        'string.base': 'Category should be a string',
        'string.empty': 'Category is required'
    }),
    description: joi.string().required().min(10).max(200).messages({
        'string.base': 'Description should be a string',
        'string.empty': 'Description is required'
    })
})


module.exports= productValidation