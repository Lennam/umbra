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

  async preArtical(createDate) {
    return Artical.find({ 'createDate': { '$lt': createDate } }).sort({createDate: -1}).limit(1)
  }

  async nextArtical(createDate) {
    return Artical.find({ 'createDate': { '$gt': createDate } }).sort({createDate: -1}).limit(1)
  }

  async articals(pageIndex, category) {
    if (category) {
      return Artical.find({category}, null, {limit: 10}).sort({'createDate': -1})
    }
    return Artical.find(null, null, {limit: 10}).sort({"createDate": -1})
  }

  async createArtical({...args}) {
    return Artical.create({...args})
  }

  async updateArtical({id, ...args}) {
    return Artical.findByIdAndUpdate({_id: id}, {...args}, {new : true})
  }

  async deleteArtical(id) {
    return Artical.deleteOne({_id:id})
  }
}

module.exports = ArticalAPI