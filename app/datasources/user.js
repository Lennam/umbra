const { DataSource } = require('apollo-datasource');
const User = require('../model/user');


class UserAPI extends DataSource {
  constructor () {
    super();
  }

  initialize (config) {
    this.context = config.context;
  }

  async login ({username, password}) {
    return User.findOne({username, password}, function (err) {
      if (err) throw new Error('未找到用户');
    });
  }

  async createUser ({username, ...args}) {
    const user = await this.findUser(username);
    if (user) {
      throw new Error('已存在相同用户名！');
    }
    return User.create({username, createDate: new Date(), ...args});
  }

  async findUser (username) {
    return User.findOne({"username": username});
  }
}

module.exports = UserAPI;