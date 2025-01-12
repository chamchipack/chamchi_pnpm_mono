import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';

import getWords from './resolvers/getWords';
import getWordListOr from './resolvers/japanese/getWordListOr';

import client from './config/mongo';

const app = express();
const PORT = 4000;

const root = {
  getWords,
  getWordListOr,
};

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
