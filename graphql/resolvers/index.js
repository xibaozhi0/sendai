const messagesResolvers = require('./messages');
const usersResovlers=require('./users')
const productsResovlers=require('./products')
const categoriesResovlers=require('./categories')
const commentsResovlers=require('./comments')

module.exports = {
    Query: {
        ...messagesResolvers.Query,
        ...usersResovlers.Query,
        ...productsResovlers.Query,
        ...categoriesResovlers.Query,
        ...commentsResovlers.Query
    },
    Mutation: {
        ...messagesResolvers.Mutation,
        ...usersResovlers.Mutation,
        ...productsResovlers.Mutation,
        ...categoriesResovlers.Mutation,
        ...commentsResovlers.Mutation

    },
};