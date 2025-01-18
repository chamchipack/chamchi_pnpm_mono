import dotenv from 'dotenv';
dotenv.config();

/**
 *
 * @description
 * 카카오 로그인 최초 진입 지점
 * 클라이언트로부터 수신된 것 하나 없이 여기서 카카오 서버로 송신
 */
export const getStartKakaoLogin = async () => {
  // https://kauth.kakao.com/oauth/authorize

  return { result: true };
};
