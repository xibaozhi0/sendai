const {model,Schema}=require('mongoose')
const messageSchema=new Schema({
    text:String,
    createdAt:String,
    createBy:String
})

module.exports=model('Message',messageSchema)