const Koa = require('koa');
// const koaBody = require('koa-body');
const logger = require('koa-logger');
const { ApolloServer } = require('apollo-server-koa');
const resolvers = require('./resolvers');
const typeDefs = require('./scheme');

const UserAPI = require('./datasources/user');
const ArticalAPI = require('./datasources/artical');
const CategoryAPI = require('./datasources/category');

const initDB = require('./database');
const log4js = require('./logger');
const { isValidUser } = require('./authentication');
const { createKey } = require('./utils');

const port = 3000;

initDB();
const secretKey = createKey();

// A map of functions which return data for the schema.
const context = async ({ctx: {request}, ctx}) => {
  const token = request.header.authorization;
  const user = token ? await isValidUser(token, secretKey).catch(err => {
    ctx.stauts = 401;
    throw new Error('token 验证出错: ' + err);
  }) : null;
  return {
    user,
    key: secretKey
  };
};

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  dataSources: () => ({
    // launchAPI: new LaunchAPI(),
    userAPI: new UserAPI(),
    articalAPI: new ArticalAPI(),
    categoryAPI: new CategoryAPI()
  }),
  context,
});

const app = new Koa();

app.use(logger());


app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  log4js.resLogger(ctx, ms);
});

server.applyMiddleware({ app }); 

app.on('error', (err, ctx) => {
  log4js.errLogger(ctx, err);
  console.error('server error', err, ctx);
});

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);