const { ApolloServer }  = require('apollo-server');
const mongoose = require('mongoose');
const dotenv =require('dotenv')
dotenv.config()
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB,PORT,NODE_ENV}=process.env

// const { typeDefs } = require("./schema");
// const { Query } = require("./resolvers/Query");
// const { Mutation } = require("./resolvers/Mutation");
// const { Category } = require("./resolvers/Category");
// const { Product } = require("./resolvers/Product");
// const { db } = require("./db");
const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: true,
    graphiql: NODE_ENV === 'development' ? true : false,
});
 
mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: PORT});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });