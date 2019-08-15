const cryptiles = require('cryptiles');
const { createToken } = require('../authentication');

module.exports = {
  Query: {
    // User
    users: async (_, __, {dataSources}) => dataSources.userAPI.findUser(),
    me: async (_, __, { user, dataSources }) => {
      const valid = await user;
      if (!valid) {
        throw new Error('您没有权限，请登录后再试！');
      }
      const userInfo = await dataSources.userAPI.findUser(valid);
      return {
        username: userInfo.username,
        createDate: userInfo.createDate,
        mail: userInfo.mail
      };
    },

    // Artical
    artical: async (_, { id }, { dataSources }) => {
      const artical = await dataSources.articalAPI.artical(id);
      const prePro = dataSources.articalAPI.preArtical(artical.createDate);
      const nextPro = dataSources.articalAPI.nextArtical(artical.createDate);
      const pre = await prePro;
      const next = await nextPro;
      if (artical) return {
          id: artical.id,
          title: artical.title,
          content: artical.content,
          createDate: artical.createDate,
          category: artical.category,
          pre: pre[0] ? {
            id: pre[0].id,
            title: pre[0].title
          } : null,
          next: next[0] ? {
            id: next[0].id,
            title: next[0].title
          } : null
      };
    },

    articals: async (_, { pageIndex, category }, { dataSources }) => {
      // const valid = await user
      // if (!valid) {
      //   throw new Error('您没有权限，请登录后再试！')
      // }
      const articals = await dataSources.articalAPI.articals(pageIndex, category);
      if (articals) return {
        pageIndex,
        list: articals
      };
    },

    // category
    category: async (_, __, { dataSources}) => {
      // const valid = await user
      // if (!valid) {
      //   throw new Error('您没有权限，请登录后再试！')
      // }
      const category = await dataSources.categoryAPI.category();
      if (category) return category;
    },



    //  hanlde Error
    Error: () => {
      throw new Error('您没有权限，请登录后再试！');
    },
  },
  Mutation: {
    // User
    createUser: async (_, {...args}, {dataSources}) => {
      const user = await dataSources.userAPI.createUser({...args});
      if(user) return {
        user: user
      };
      return 'chucuole';
    },
    login: async (_, {username, password}, {key, dataSources}) => {
      const result = await dataSources.userAPI.login({username, password});
      if (cryptiles.fixedTimeCimparison(result.password, password)) return {
        message: '登录成功',
        success: true,
        token: createToken({key, username, password})
      };
    },

    // Artical
    createArtical: async (_, {...args}, {user, dataSources}) => {
      const valid = await user;
      if (!valid) {
        throw new Error('您没有权限，请登录后再试！');
      }
      const artical = await dataSources.articalAPI.createArtical({...args});
      if(artical) return {
        artical
      };
      throw new Error('创建失败');
    },

    updateArtical: async (_, {...args}, {user, dataSources}) => {
      const valid = await user;
      if (!valid) {
        throw new Error('您没有权限，请登录后再试！');
      }
      const artical = await dataSources.articalAPI.updateArtical({...args});
      if(artical) return {
        artical
      };
      throw new Error('更新失败');
    },

    deleteArtical: async (_, {id}, {dataSources}) => {
      const result  = await dataSources.articalAPI.deleteArtical(id);
      if (result) {
        return {
          success: true
        };
      }
    },

    //  CATEGORY
    createCategory: async (_, {...args}, {user,dataSources}) => {
      const valid = await user;
      if (!valid) {
        throw new Error('您没有权限，请登录后再试！');
      }
      const category = await dataSources.categoryAPI.createCategory({...args});
      if (category) return {
        name: category.name,
        value: category.value
      };
    },

    deleteCategory: async (_, {name}, { dataSources}) => {
      const result = await dataSources.categoryAPI.deleteCategory(name);
      if (result.deletedCount === 1) {
        return true;
      }
    },

    //  handle Error
    userInputError: (parent, args) => {
      if (args.input !== 'expected') {
        throw new Error('Form Arguments invalid', {
          invalidArgs: Object.keys(args),
        });
      }
    },

  }
};