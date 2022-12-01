const {model,mongoose, Schema}=require('mongoose')
const bcrypt=require('bcryptjs')
const {comments}=require('./Comment')

// const roles = {
//   values: ['ADMIN', 'EDITOR','USER'],
//   message: '{VALUE} it is not a valid role'
// }

const userSchema=new Schema({
  username:{type:String,default:null},
  email:{type:String,unique:true},
  password:{type:String},
  token:{type:String},
  phone:{type:String},
  avatar:{type:String,default:null},
  createdAt:{type:String},
  // role: {
  //   type: String,
  //   default: 'USER_ROLE',
  //   enum: roles
  // },
  comments: [
    {
      type: mongoose.Types.ObjectId, ref: "Comment"
    }
  ]
  
})
module.exports=model('User',userSchema)