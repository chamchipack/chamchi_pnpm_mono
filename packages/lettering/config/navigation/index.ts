export type NavigationMessage = {
  type: 'NAVIGATE';
  path: string;
};

export type StorageMessage = {
  type: 'STORAGE';
  data: string;
};

type Status = 'forward' | 'back' | 'replace';

type Params = {
  path: string;
  status: Status;
  params?: string;
};
/**
 * 네비게이션 처리 함수
 * @param path 이동할 경로
 *
 * status : forward 기본, back 뒤로가기, replace : replace
 *
 * params => JSON.stringify({ _id: '', type: ''})
 * @returns WebView 환경이면 `true`, 그렇지 않으면 `false`
 */
export const handleNavigation = (params: Params): boolean => {
  const data = {
    path: params.path || '',
    status: params.status || 'forward',
    params: params?.params || '',
  };
  if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
    // ✅ WebView 환경에서 네이티브로 메시지 전송
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'NAVIGATE',
        data,
      } as any),
    );
    return true; // WebView에서 처리됨
  }

  return false; // WebView가 아니므로 `router.push` 실행해야 함
};

type LoginParams = {
  type: 'LOGIN';
  data: 'kakao' | 'apple';
};

export const handleLogin = (params: LoginParams): boolean => {
  if (params.type !== 'LOGIN' || !params?.data) return false;

  if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
    // ✅ WebView 환경에서 네이티브로 메시지 전송
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'LOGIN',
        data: params.data,
      } as any),
    );
    return true; // WebView에서 처리됨
  }

  return false;
};

type LocationParams = {
  data: unknown;
};

export const handleFindLocation = (params: StorageParams): boolean => {
  if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'LOCATION',
        data: params.data || '',
      } as LocationParams),
    );
    return true; // WebView에서 처리됨
  }

  return false; // WebView가 아니므로 `router.push` 실행해야 함
};

type StorageParams = {
  data: unknown;
};

/**
 *
 * @param params : 1개의 데이터만 스토리지에 저장할때는 { key: '키값', name: '저장할 데이터' }
 *
 * @param params : 2개 이상의 데이터를 스토리지에 저장할때는 { multiple: true, data: [] }
 * data 배열의 구조는 { key: '키값', name: '저장할 데이터'}[]
 */
export const handleStorage = (params: StorageParams): boolean => {
  if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'STORAGE',
        data: params.data || '',
      } as StorageMessage),
    );
    return true; // WebView에서 처리됨
  }

  return false; // WebView가 아니므로 `router.push` 실행해야 함
};
