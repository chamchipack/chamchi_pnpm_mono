'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { UserInfoAtom } from '@/store/userStore/state';

const KakaoLoginCallback = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(UserInfoAtom);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      fetch('/api/auth/kakao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log('카카오 로그인 성공:', data);
          try {
            const { user: { id = 0, kakao_account = {} } = {} } = data;

            setUserInfo((prev) => ({
              ...prev,
              userId: id.toString() || '',
              nickname: kakao_account?.profile?.nickname || '',
              profile_image: kakao_account?.profile?.profile_image_url || '',
              provider: Provider.Kakao,
            }));
          } catch (e) {}
          router.push('/application/mypage'); // 로그인 후 홈으로 이동
        });
    }
  }, [router]);

  return <div></div>;
};

export default KakaoLoginCallback;

// {
//   "user": {
//       "id": 3930568100,
//       "connected_at": "2025-02-21T01:55:47Z",
//       "properties": {
//           "nickname": "조찬익",
//           "profile_image": "http://k.kakaocdn.net/dn/qUob5/btqN2e3rNCL/OguyFAl8KCf1FHQDGGjso1/img_640x640.jpg",
//           "thumbnail_image": "http://k.kakaocdn.net/dn/qUob5/btqN2e3rNCL/OguyFAl8KCf1FHQDGGjso1/img_110x110.jpg"
//       },
//       "kakao_account": {
//           "profile_nickname_needs_agreement": false,
//           "profile_image_needs_agreement": false,
//           "profile": {
//               "nickname": "조찬익",
//               "thumbnail_image_url": "http://k.kakaocdn.net/dn/qUob5/btqN2e3rNCL/OguyFAl8KCf1FHQDGGjso1/img_110x110.jpg",
//               "profile_image_url": "http://k.kakaocdn.net/dn/qUob5/btqN2e3rNCL/OguyFAl8KCf1FHQDGGjso1/img_640x640.jpg",
//               "is_default_image": false,
//               "is_default_nickname": false
//           }
//       }
//   }
// }
