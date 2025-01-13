import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';

import getWordListAndType from './resolvers/japanese/getWordListAndType';
import getWordListOrType from './resolvers/japanese/getWordListOrType';
import getOneWordFromId from './resolvers/japanese/getOneWordFromId';
import getWordListTotalcount from './resolvers/japanese/getWordListTotalcount';

import getVocaList from './resolvers/vocabulary/getVocaList';

import client from './config/mongo';
import createWord from './resolvers/japanese/createWord';

const app = express();
const PORT = 4000;

const root = {
  getWordListAndType,
  getWordListOrType,
  getOneWordFromId,
  getWordListTotalcount,
  getVocaList,

  createWord,
};

app.use('/graphql', (req, res, next) => {
  const apiKey = req.headers['x-api-key']; // 헤더에서 키 추출
  const validApiKey = 'your-secret-key'; // 유효한 키 설정

  // console.log(req.headers);

  // if (apiKey !== validApiKey) {
  //   // 키가 유효하지 않으면 403 Forbidden 응답
  //   res.status(403).json({ error: 'Unauthorized: Invalid API Key' });
  //   return;
  // }
  next(); // 유효한 키일 경우 다음 미들웨어로 전달
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
  run().catch(console.dir);
});
