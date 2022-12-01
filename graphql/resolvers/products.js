

const Comment = require("../../models/Comment");
const Product = require("../../models/Product");

module.exports = {
  Mutation: {
    async addProduct(
      _,
      {
        productInput: {
          name,
          description,
          quantity,
          image,
          price,
          onSale,
          comments
        }
      }
    ) {
      const newProduct = new Product({
        // id: uuid(),
        name: name,
        description: description,
        quantity: quantity,
        image: image,
        price: price,
        onSale: onSale,
        comments:[Comment]
      });
      const res = await newProduct.save();
      console.log(res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteProduct(_, { ID }) {
      const deletedNum = (await Product.deleteOne({ _id: ID })).deletedCount;
      //if something was deleted,it is 1,
      //if nothing was deleted, it is 0
      return deletedNum;
    },
    async updateProduct(
      _,
      {
        ID,
        productInput:
         {
          name,
          description,
          quantity,
          image,
          price,
          onSale,
          comments,
        },
      }
    ) {
      const updateProductNum = (await Product.updateOne(
        { _id: ID },
        {
          name: name,
          description: description,
          quantity: quantity,
          image: image,
          price: price,
          onSale: onSale,
          comments: [comments],
        }
      )).modifiedCount;
      return updateProductNum;
    },
  },

  Query: {
    async product(_, { ID }) {
      return await Product.findById(ID);
    },
    async getProducts(_, arg,{ amount }) {
      await Product.find({name:arg.name}).populate('price','quantity').exec().then((product) => { message=product })
      return  message
    },
  },
};
