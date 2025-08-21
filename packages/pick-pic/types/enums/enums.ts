export enum SocialProviderEnum {
  kakao = 'kakao',
  apple = 'apple',
  google = 'google',
  naver = 'naver',
}

export enum ResponseStatus {
  success = 'success',
  error = 'error',
}

export type Status = ResponseStatus.error | ResponseStatus.success;
