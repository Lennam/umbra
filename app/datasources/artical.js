const { DataSource } = require('apollo-datasource')
const Artical = require('../model/artical')


class ArticalAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async artical(id) {
    return Artical.findById(id)
  }

  async articals() {
    return Artical.find(null, null, {limit: 10}).sort({"createDate": -1})
  }

  async createArtical({...args}) {
    return Artical.create({...args})
  }

  async deleteArtical(id) {
    return Artical.deleteOne({_id:id})
  }
}

module.exports = ArticalAPI