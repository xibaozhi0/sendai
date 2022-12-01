/*
A Model that can operate the category collection data
 */
// 1.introduce mongoose
const {model, Schema,mongoose}=require('mongoose')
var {products}=require('./Product')


// 2..Schema(Describe the document structure do)

const categorySchema = new Schema({
  name: { type: String, required: true },
  // parentId: { type: String, required: true, default: "0" }
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product"
    }
  ]
});

// 3. define Model(Corresponding to the set, you can operate the set)
module.exports = model("Category", categorySchema);



