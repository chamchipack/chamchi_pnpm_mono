// 스토리지에 저장하는 타이밍을 고민해봅시다

type User = {
  userId: string; // 필요
  nickname: string; // 필요
  mobile: string; // 필요
  profileImage: string; // 필요
  social: 'kakao' | 'google'; // 필요할듯
  address: string; // 필요
  latitude: string; // 필요
  longitude: string; // 필요
};

declare namespace MyNamespace {
  interface User {
    name: string;
    age: number;
  }
}

const user: MyNamespace.User = {
  name: 's',
  age: 25,
};
