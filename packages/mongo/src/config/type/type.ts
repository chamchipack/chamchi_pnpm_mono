export type library = {
  _id: string;
  category: string;
  imageId: string;
  log: number;
  markdown_contents: string;
  markdown_title: string;
  summary: string;
  tag: string[] | [];
  theme: string;
  thumbnail: string;
  userId: string;
  userName: string;
  isPublic: boolean;
  created: string;
  updated: string;
};

export type libraryWithoutId = {
  category: string;
  imageId: string;
  log: number;
  markdown_contents: string;
  markdown_title: string;
  summary: string;
  tag: string[] | [];
  theme: string;
  thumbnail: string;
  userId: string;
  userName: string;
  isPublic: boolean;
  created: string;
  updated: string;
};

// {
//     "category": "",
//     "imageId": "",
//     "log": 0,
//     "markdown_contents": "### 리스트를 캐시에 담아보기\r\n```\r\n const {data, fetchMore, loading} = useQuery(query, {\r\n    variables: {\r\n      input: { ... }\r\n      offset: number\r\n      limit: number,\r\n    },\r\n    fetchPolicy: 'cache-first',\r\n  });\r\n```\r\n**cache-first 정책**을 이용하여 배열을 가져오는 쿼리를 작성합니다. \r\nfetch는 무한 스크롤로 데이터를 가져올 수 있도록 예시를 구성했고, offset과 limit을 통해 page, perPage를 구성했다.\r\n\r\n위와같이 받은 데이터를, apollo client에서 watchQuery 및 subscribe 하여 캐시에 등록된 데이터를 아래와 같이 확인할 수 있었다\r\n```\r\n{\r\n    \"ROOT_MUTATION\": {\r\n        \"__typename\": \"Mutation\"\r\n    },\r\n    \"ROOT_QUERY\": {\r\n        \"__typename\": \"Query\",\r\n        \"getWordListOrType({\\\"input\\\":{\\\"type\\\":\\\"exampleType\\\"},\\\"limit\\\":10,\\\"offset\\\":0})\": [],\r\n        \"getWordListOrType({\\\"input\\\":{\\\"jp\\\":\\\"\\\",\\\"kana\\\":\\\"\\\",\\\"ko\\\":\\\"\\\",\\\"ro\\\":\\\"\\\",\\\"type\\\":\\\"verb\\\"},\\\"limit\\\":8,\\\"offset\\\":0})\": [\r\n            {\r\n                \"__ref\": \"Japanese:678711e95bad51fa0bfadbe0\"\r\n            },\r\n            {\r\n                \"__ref\": \"Japanese:678711e95bad51fa0bfadbe3\"\r\n            },\r\n            ........\r\n        ]\r\n    },\r\n    \"Japanese:678711e95bad51fa0bfadbe0\": {\r\n        \"__typename\": \"Japanese\",\r\n        \"_id\": \"678711e95bad51fa0bfadbe0\",\r\n        \"ko\": \"쓰다\",\r\n        \"jp\": \"書く\",\r\n        \"ro\": \"kaku\",\r\n        \"kana\": \"かく\"\r\n    },\r\n    \"Japanese:678711e95bad51fa0bfadbe3\": {\r\n        \"__typename\": \"Japanese\",\r\n        \"_id\": \"678711e95bad51fa0bfadbe3\",\r\n        \"ko\": \"보다\",\r\n        \"jp\": \"見る\",\r\n        \"ro\": \"miru\",\r\n        \"kana\": \"みる\"\r\n    },\r\n    \"Japanese:678711e95bad51fa0bfadbe4\": {\r\n        \"__typename\": \"Japanese\",\r\n        \"_id\": \"678711e95bad51fa0bfadbe4\",\r\n        \"ko\": \"듣다\",\r\n        \"jp\": \"聞く\",\r\n        \"ro\": \"kiku\",\r\n        \"kana\": \"きく\"\r\n    },\r\n  .........\r\n}\r\n```\r\n\r\n정규화된 객체 (Japanese:ID)\r\n쿼리 결과에 포함된 데이터를 __typename과 ID(_id)를 조합하여 고유 키로 저장.\r\n리스트는 __ref(참조)를 사용해 이 정규화된 객체를 가리킨다.\r\n\r\n\r\n구현된 UI가 무한스크롤이라서 불러오는 개수만큼 캐시에 담기는것을 확인 할 수 있었다. \r\n\r\n또한 리스트에 있는 **_id를 따라 매핑**을 하기때문에, 서버와의 요청또한 캐시와의 중복된 값들이면 가져오지 않는것을 확인할 수 있었다. GraphQL 서버에서의 콘솔 또한 이전처럼 캐시가 존재할 때는 요청이 들어가지 않았다.\r\n\r\n\r\n### 여기서 문제는\r\n**리스트를 캐시에 담다보면 개수가 엄청 늘어날것같은데, 얼마까지 늘어나는거야**\r\n\r\n라는 궁금증이 있었고, 찾아보니\r\n\r\n캐시가 당연히 메모리를 사용하면서, 캐시에 담긴 데이터가 늘어난다면 **성능 부족**으로 이어질 수 있다는 것이 당연한 의견 이었다.\r\n\r\nLeast Recently Used 정책 이라고 해서 max Size에 도달하면 삭제하는 정책과 같은 것을 직접 추가해야한다는 번거로움이 있긴 하다\r\n\r\n또한 아폴로 클라이언트에서는 자체의 Garbage Collection을 실행할 수 있는 도구가 존재한다. Apollo Client의 캐시에서 참조되지 않는 데이터는 cache.gc() 호출 시 정리된다고 하는데,\r\n\r\n직접 정의하고 세워야하는 번거로움이 있으니 폭 넓은 지식을 통해서 구축해 나가야 하는 필요가 있어보인다. GC에 대해서 좀더 알아 보기로 해야겄어",
//     "markdown_title": "GraphQL 캐시 테스트 2",
//     "summary": "리스트를 캐시에 담아보기\r\n\r\ncache-first 정책을 이용하여 배열을 가져오는 쿼리를 작성합니다. \r\nfetch는 무한 스크롤로 데이터를 가져올 수 있도록 예시를 구성했고, off...",
//     "tag": [],
//     "theme": "study",
//     "thumbnail": "",
//     "userId": "시스템관리자",
//     "userName": "시스템관리자"
//   }
