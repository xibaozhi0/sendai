const { uuid } = require("uuid");
const {model, Schema,mongoose}=require('mongoose')
const  {Product} =require('./Product')
const {User}=require('./User')

const commentSchema=new Schema({   
  title:{type:String,required:true},
    text:{type:String,required:true},
    createdAt:{type:String},
    // product:{ type: mongoose.Types.ObjectId,ref: "Product"},  
  //   user:{type:mongoose.Types.ObjectId,ref: "User"}   
  
});
  module.exports=model('Comment',commentSchema)

  
  