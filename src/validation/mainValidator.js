const Joi = require('joi')

// validate
async function validateRegister(req, res, next){
    const schema = Joi.object({
        name: Joi.string().min(4).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(6).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
    try {
        const value = await schema.validateAsync(req.body,{abortEarly: false})
        next()
    } catch (err){
        console.log(err.message)
        return res.status(400).send({error: err.details.map(item => ({
                errorMsg: item.message,
                field: item.context.key
            }))})
    }
}
module.exports = {
    validateRegister
}