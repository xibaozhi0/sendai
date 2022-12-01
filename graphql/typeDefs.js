const { gql } = require('apollo-server');

module.exports = gql`
type Message {
    text: String
    createdAt: String
    createdBy: String
}

type User {
    username:String
    email:String
    password:String
    token:String
    phone:String
    avatar:String
    createdAt:String
    comments:[String]
}

type Product {
    # id:ID!
    name:String!
    description:String!
    quantity:Int!
    price:Float!
    onSale:Boolean!
    # categoryId:Category
    comments:[Comment]
}

type Category{
    # id:ID!
    name:String!
    product:[Product!]!
}

type Comment {
    # id:ID!
    title:String!
    text:String!

}

input CommentInput {
    title:String!
    text:String!
    
}

input CategoryInput{
    name:String!
     product:[String!]!
}

input MessageInput {
    text: String
    username: String
}

input RegisterInput {
    username: String
    email: String
    password: String
    phone:String
    avatar:String

}

input LoginInput {
    email: String
    password: String
}


input ProductInput{
    name:String!
    description:String!
    quantity:Int!
    image:String!
    price:Float!
    onSale:Boolean!
    comments:[String]
    # categoryId:String
}



type Query {
    message(id: ID!): Message
    user(id: ID!): User
    product(id:ID!):Product!
    getProducts(name:String!):[Product]
    category(id:ID!):Category!
    getCategories(name:String!):[Category]
}

type Mutation {
    createMessage(messageInput: MessageInput): Message!
    registerUser(registerInput:RegisterInput):User
    loginUser(loginInput: LoginInput):User
    addProduct(productInput:ProductInput):Product!
    deleteProduct(ID:ID!):Boolean
    updateProduct(ID:ID!,productInput:ProductInput):Boolean
    addCategory(categoryInput:CategoryInput):Category!
    deleteCategory(ID:ID!):Boolean
    updateCategory(ID:ID!,categoryInput:CategoryInput):Boolean
}
`