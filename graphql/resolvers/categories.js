

const Category = require("../../models/Category");

module.exports = {
  Mutation: {
    async addCategory(_, { addCategoryInput: { name } }) {
      const newCategory = new Category({
        name: name,
        // id: uuid(),
        parentId: parentId,
      });
      const res = await newCategory.save();
      console.log(res._doc);
      return {
        id: res.id,
        ...res._doc,
      };
    },

    async deleteCategory(_, { ID }) {
      const deletedCategoryNum = (await Category.deleteOne({ _id: ID }))
        .deletedCount;
      //if something was deleted,it is 1,
      //if nothing was deleted, it is 0
      return deletedCategoryNum;
    },
    async updateCategory(_, { ID, categoryInput: { name, parentId } }) {
      const updateCategoryNum = (
        await category.updateOne(
          { _id: ID },
          {
            name: name,
            parentId: parentId,
          }
        )
      ).modifiedCount;
      return updateProductNum;
    },
  },

  Query: {
    async category(_, { ID }) {
      return await Category.findById(ID);
    },
    async getCategories(_, { amount }) {
      return await Category.find().sort({ createdAt: -1 }).limit(amount);
    },
  },
};
