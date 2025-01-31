import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';

import express from 'express';
import schema from './schema/schema';

import getOneWordFromId from './resolvers/voca/japanese/getOneWordFromId';
import getWordListAndType from './resolvers/voca/japanese/getWordListAndType';
import getWordListOrType from './resolvers/voca/japanese/getWordListOrType';
import getWordListTotalcount from './resolvers/voca/japanese/getWordListTotalcount';

import getVocaList from './resolvers/voca/vocabulary/getVocaList';

import client from './config/mongo';
import createWord from './resolvers/voca/japanese/createWord';
import deleteWord from './resolvers/voca/japanese/deleteWord';
import updateWord from './resolvers/voca/japanese/updateWord';

import { kakaoLogin } from './resolvers/socialLogin/kakao';

import { graphqlHTTP } from 'express-graphql';
import { kakaoInitialCheck } from './resolvers/socialLogin/kakaoInitialCheck';

const resolvers = {
  Query: {
    getWordListAndType,
    getWordListOrType,
    getOneWordFromId,
    getWordListTotalcount,
    getVocaList,
  },
  Mutation: {
    createWord,
    deleteWord,
    updateWord,
    kakaoLogin,
    kakaoInitialCheck,
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

const server = new ApolloServer({
  schema: executableSchema,
  context: ({ req }) => {
    // const apiKey = req.headers['x-api-key'];
    // const validApiKey = 'your-secret-key';
    // if (apiKey !== validApiKey) {
    //   throw new Error('Unauthorized: Invalid API Key');
    // }
    return { client }; // context에 필요한 값 추가
  },
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    run();
  });
}

const app = express() as any;
const PORT = 4000;

app.use(
  '/graphqlsss',
  graphqlHTTP({
    schema: executableSchema,
    graphiql: true, // GraphiQL 활성화
  }),
);

// const corsOptions = {
//   origin: 'https://studio.apollographql.com',
//   credentials: true, // Credential 설정
// };

// app.use(cors(corsOptions)); // CORS 미들웨어 추가

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

startServer().catch((error) => console.log(error));
