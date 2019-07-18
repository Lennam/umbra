const { createToken } = require('../authentication')

module.exports = {
  Query: {
    // User
    users: async (_, __, {dataSources}) => dataSources.userAPI.findUser(),
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
    },

    // Artical
    artical: async (_, { id }, { dataSources }) => {
      const artical = await dataSources.articalAPI.artical(id)
      console.log(artical)
      if (artical) return {
        title: artical.title
      }
    }
  },
  Mutation: {
    // User
    createUser: async (_, {...args}, {dataSources}) => {
      const user = await dataSources.userAPI.createUser({...args})
      if(user) return {
        user: user
      }
      return 'chucuole'
    },
    login: async(_, {username, password}, {key, dataSources}) => {
      const result = await dataSources.userAPI.login({username, password})
      if (password === result.password) return {
        message: '登录成功',
        success: true,
        token: createToken({key, username, password})
      }
    },

    // Artical
    createArtical: async (_, {...args}, {dataSources}) => {
      const artical = await dataSources.articalAPI.createArtical({...args})
      if(artical) return {
        title: artical.title
      }
      throw new Error('创建失败')
    },

  }
};