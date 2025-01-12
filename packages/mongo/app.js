// Express module
const express = require('express');
require('dotenv').config();
const app = express();
const PORT = 4000;

// mongo module
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Graphql
const { graphqlHTTP } = require('express-graphql'); // GraphQL 미들웨어
const { buildSchema } = require('graphql'); // GraphQL 스키마 생성


// 스키마
const schema = buildSchema(`
  type User {
    _id: ID
    name: String
    address: String
    age: Int
  }

  input UserInput {
    name: String
    address: String
    age: Int
    id: ID
  }

  type Query {
    getUsers(input: UserInput): [User]
    getUsername(id: ID!): String
  }
`);

// 리졸버 함수 정의
const root = {
  getUsers: async ({ input }) => {
    try {
      await client.connect(); // MongoDB 연결
      const db = client.db('library'); // 사용할 데이터베이스 이름
      const usersCollection = db.collection('chamchi'); // 사용할 컬렉션 이름

      console.log(input)

      // 조건에 맞는 필터 생성
      const filter = {};
      if (input) {
        if (input.name) filter.name = input.name;
        if (input.address) filter.address = input.address;
        if (input.age) filter.age = input.age;
        if (input.id) filter._id = new ObjectId(input.id);
      }

      // 필터에 맞는 데이터 조회
      const users = await usersCollection.find(filter).toArray();
      return users; // 조회된 사용자 데이터 반환
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Error fetching users');
    } finally {
      await client.close(); // MongoDB 연결 닫기
    }
  },
  getUsername: async ({ id }) => {
    try {
      await client.connect(); // MongoDB 연결
      const db = client.db('library'); // 사용할 데이터베이스 이름
      const usersCollection = db.collection('chamchi'); // 사용할 컬렉션 이름

      // ID로 사용자 조회
      const objectId = new ObjectId(id)
      const user = await usersCollection.findOne({ _id: objectId }, { projection: { name: 1, _id: 0 } });

      // 사용자 이름 반환
      return user ? user.name : null;
    } catch (error) {
      console.error('Error fetching username:', error);
      throw new Error('Error fetching username');
    } finally {
      await client.close(); // MongoDB 연결 닫기
    }
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema, // 위에서 정의한 스키마
    rootValue: root, // 리졸버 연결
    graphiql: true,  // GraphiQL UI 활성화 (개발 편의성)
  })
);

// MongoDB 연결 테스트용 함수
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  run().catch(console.dir); // MongoDB 연결 확인
});
