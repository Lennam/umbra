const { createToken } = require('../authentication')

module.exports = {
  Query: {
    users: (_, __, {dataSources}) => dataSources.userAPI.findUser(),
    me: async (_, __, { user, dataSources }) => {
      const valid = await user
      if (!valid) {
        throw new Error('您没有权限，请登录后再试！')
      }
      const userInfo = await dataSources.userAPI.findUser(valid)
      console.log(userInfo)
      return {
        username: userInfo.username,
        createDate: userInfo.createDate,
        mail: userInfo.mail
      }
    }
  },
  Mutation: {
    createUser: async (_, {...args}, {dataSources}) => {
      const user = await dataSources.userAPI.createUser({...args})
      console.log(user)
      if(user) return {
        user: user
      }
      return 'chucuole'
    },
    login: async(_, {username, password}, {key, dataSources}) => {
      const result = await dataSources.userAPI.login({username, password})
      console.log(result)
      if (password === result.password) return {
        message: '登录成功',
        success: true,
        token: createToken({key, username, password})
      }
    }

  }
};