import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // GraphQL 서버 URL
  cache: new InMemoryCache({
    typePolicies: {
      //   Word: {
      //     keyFields: ['_id'], // Word 객체는 `_id` 필드를 기반으로 캐싱
      //   },
    },
  }), // 캐시 설정
  connectToDevTools: true,
});

export default client;
