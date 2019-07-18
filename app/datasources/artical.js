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
    return Artical.findById(id, function(err, artical) {
      if (err) throw new Error('未找到文章')
    })
  }

  async articals() {
    return Artical.find(null, null, {limit: 10}, function(err, list) {
      if (err) throw new Error('查询失败')
    })
  }

  async createArtical({...args}) {
    return Artical.create({...args})
  }
}

module.exports = ArticalAPI