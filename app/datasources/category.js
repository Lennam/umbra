const { DataSource } = require('apollo-datasource')
const Category = require('../model/category')


class CategoryAPI extends DataSource {
  constructor() {
    super();
  }

  async category() {
    return Category.find()
  }

  async createCategory({name, value}) {
    const category = await Category.findOne({name})
    if (category) {
      throw new Error('已存在相同用户名！')
    }
    return Category.create({name, value})
  }

  async deleteCategory(name) {
    return Category.deleteOne({'name': name})
  }
}

module.exports = CategoryAPI