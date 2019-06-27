const Koa = require('koa');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const { ApolloServer, gql } = require('apollo-server-koa');
const resolvers = require('./resolvers');
const typeDefs = require('./scheme')
const UserAPI = require('./datasources/user')
const initDB = require('./database')
const log4js = require('./logger')

initDB();


// A map of functions which return data for the schema.

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  dataSources: () => ({
    // launchAPI: new LaunchAPI(),
    userAPI: new UserAPI()
  })
});

const app = new Koa();

app.use(logger())

app.use(async(ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  log4js.resLogger(ctx, ms)
})

app.on('error', (err, ctx) => {
  log4js.errLogger(ctx, err)
  console.error('server error', err, ctx)
});

server.applyMiddleware({ app }); 

app.listen({ port: 3000 }, () =>
  console.log(`🚀 Server ready at http://localhost:3000${server.graphqlPath}`)
)