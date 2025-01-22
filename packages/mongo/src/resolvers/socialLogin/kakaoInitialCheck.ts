import dotenv from "dotenv";
import client from "../../config/mongo";
import { Auth } from "../../schema/socialLogin/type";

dotenv.config();

const database = process.env.DATABASE;
const rest_key = process.env.KAKAO_REST_API_KEY

const refreshKakaoToken = async (refreshToken: string) => {
  const url = 'https://kauth.kakao.com/oauth/token';

  const payload = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: rest_key || '', // 카카오 앱 REST API 키
    refresh_token: refreshToken, // 기존 리프레시 토큰
    // client_secret: 'YOUR_CLIENT_SECRET', // (선택 사항) 클라이언트 시크릿
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('토큰 재발급 실패:', errorData);

      return {
        success: false,
        status: response.status,
        message: errorData.error_description || 'Failed to refresh token',
      };
    }

    const data = await response.json();
    // console.log('재발급된 토큰:', data);

    return {
      success: true,
      status: 200,
      data, // { access_token, refresh_token, expires_in, ... }
    };
  } catch (error) {
    console.error('토큰 재발급 실패:', error);

    return {
      success: false,
      status: 500,
      message: 'An error occurred while refreshing token',
    };
  }
};

const secondsToFormattedDate = (seconds: number): string => {
  // 현재 시간
  const now = new Date();

  // 현재 시간에 초를 더함
  const futureDate = new Date(now.getTime() + seconds * 1000);

  // 날짜와 시간을 포맷
  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(futureDate.getDate()).padStart(2, '0');
  const hours = String(futureDate.getHours()).padStart(2, '0');
  const minutes = String(futureDate.getMinutes()).padStart(2, '0');
  const secondsFormatted = String(futureDate.getSeconds()).padStart(2, '0');

  // 'YYYY-MM-DD HH:mm:ss' 형식으로 반환
  return `${year}-${month}-${day} ${hours}:${minutes}:${secondsFormatted}`;
};

export const kakaoInitialCheck = async (_: undefined, {input}: { input: Auth} ) => {
    const db = client.db(database);
    const authCollection = db.collection<Auth>("auth");
  
    // 현재 시간
    const now = new Date().toISOString();

    
    try {
        const existingUser = await authCollection.findOne({
            social_id: input.social_id,
            provider: input.provider,
        });
        
        if (existingUser) {
          let isAuthenticated = existingUser.is_active ? true : false

          // if (existingUser?.refresh_token) {
          //   const { success = false, status = 404, data = {}}: any = await refreshKakaoToken(existingUser?.refresh_token) || {}
          //   console.log(success,status)
          //   if (success && status === 200) {
          //     const filter = { _id: existingUser._id }
          //     const updateContent = { $set: { refresh_token: data?.refresh_token, refresh_expires_at: secondsToFormattedDate(data?.refresh_token_expires_in)}}
          //     const result = await authCollection.updateOne(filter, updateContent);
          //     console.log(result)

          //   }
          // }

            return { status: isAuthenticated ? 200 : 403, isAuthenticated };
          } else {
            return { status: 404, isAuthenticated: false}
          }
        } catch (error) {
            console.log(error)
            // MongoDB 연결 문제
            if (error instanceof Error) {
              console.error("MongoDB Error:", error.message);
              return { status: 500, message: "Database error occurred", error: error.message };
            }
        
            // 예상치 못한 에러 처리
            console.error("Unexpected Error:", error);
            return { status: 500, message: "Unexpected server error" };
          }
}