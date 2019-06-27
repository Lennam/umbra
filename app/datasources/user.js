const {DataSource} = require('apollo-datasource')
const User= require('../model/user')
const koaJwt = require('koa-jwt')


class UserAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  async login({username, password}) {
    return User.findOne({'username': username}, 'password', function(err, user) {
      if (err) throw new Error('未找到用户')
      return user.password
    })
  }

  async createUser({...args}) {
    return User.create({createDate: new Date(), ...args})
  }

  async findUser() {
    return this.collection.find()
  }
}

module.exports = UserAPI