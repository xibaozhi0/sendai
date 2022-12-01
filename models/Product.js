/*
A Model that can operate the products collection data
 */
// 1.introduce mongoose
const {model, Schema,mongoose}=require('mongoose')
const  {categoryId} =require('./Category')

// 2.Schema(Describe the document structure do)

const productSchema = new Schema({
//  categories: [
//     {
//       type: mongoose.Types.ObjectId,
//       ref: "Categories"
//     } 
  name: {type: String, required: true}, // commodity name
  price: {type: Number, required: true}, // price
  quantity: {type: Number},
  onSale: {type: Boolean}, // commodity status: 1:on sales, 2: not in sales
  image: {type: String}, // The json string of n picture file names
  description: {type: String},
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment"
    }
  ]
})


// 3. expose module to outside
module.exports=model('Product',productSchema)

