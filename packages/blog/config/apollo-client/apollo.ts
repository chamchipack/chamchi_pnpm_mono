import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_MONGO_URL}/graphql`, // GraphQL 서버 URL
  cache: new InMemoryCache({
    typePolicies: {
      ArticleType: {
        keyFields: ['_id'], // ✅ `_id`를 기준으로 캐싱
      },
      Query: {
        fields: {
          getArticleListOrType: {
            keyArgs: ['input'], // ✅ 동일한 `input` 변수로 요청하면 캐시 사용
            merge(existing = [], incoming, { args }) {
              // console.log(args);
              // console.log(existing);
              // console.log(incoming);
              if (args?.input?.category === '') {
                // ✅ 기존 데이터와 새로운 데이터를 병합 후 중복 제거
                const merged = [...existing, ...incoming];
                // const uniqueMerged = Array.from(
                //   new Map(merged.map((item) => [item.__ref, item])).values(),
                // );

                const seen = new Set();
                const uniqueMerged = merged.filter((item) => {
                  const isDuplicate = seen.has(item.__ref);
                  seen.add(item.__ref);
                  return !isDuplicate; // 중복이 아니면 유지
                });

                return uniqueMerged;
              }
              // if (args?.input?.categoryState === '') {
              return [...existing, ...incoming]; // 기존 데이터 + 새 데이터 병합
              // }
              // return incoming; // ✅ 기존 캐시 + 새로운 데이터 병합
            },
          },
        },
      },
      //   Word: {
      //     keyFields: ['_id'], // Word 객체는 `_id` 필드를 기반으로 캐싱
      //   },
    },
  }), // 캐시 설정
  connectToDevTools: true,
});

export default client;
