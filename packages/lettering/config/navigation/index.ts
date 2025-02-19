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
