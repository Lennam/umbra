const { getToken } = require('../utils')

module.exports = {
  Query: {
    users: (_, __, {dataSources}) => dataSources.userAPI.findUser(),
    me: (_, __, { dataSources }) => dataSources.userAPI.findUser()
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
    login: async(_, {username, password}, {dataSources}) => {
      const result = await dataSources.userAPI.login({username, password})
      console.log(result)
      if (password === result.password) return {
        message: '登录成功',
        success: true,
        token: getToken({username, password})
      }
    }

  }
};