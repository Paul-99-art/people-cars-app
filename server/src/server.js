const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

async function startServer() {
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: () => ({}),
    
    cors: {
      origin: 'http://localhost:3000',
      credentials: true
    }
  });

  await server.start();
  
  const app = express();
  
  server.applyMiddleware({ app });
  
  const PORT = 4000;
  
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer();