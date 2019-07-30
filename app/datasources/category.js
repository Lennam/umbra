const { DataSource } = require('apollo-datasource')
const Category = require('../model/category')


class CategoryAPI extends DataSource {
  constructor() {
    super();
  }

  async Category() {
    return Category.find()
  }
}

module.exports = CategoryAPI