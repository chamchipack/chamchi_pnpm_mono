export type NavigationMessage = {
  type: 'NAVIGATE';
  path: string;
};

type Status = 'forward' | 'back' | 'replace';

type Params = {
  path: string;
  status: Status;
};
/**
 * 네비게이션 처리 함수
 * @param path 이동할 경로
 * @returns WebView 환경이면 `true`, 그렇지 않으면 `false`
 */
export const handleNavigation = (params: Params): boolean => {
  console.log(params.path, 'Next.js');
  if (typeof window !== 'undefined' && (window as any).ReactNativeWebView) {
    // ✅ WebView 환경에서 네이티브로 메시지 전송
    (window as any).ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'NAVIGATE',
        path: params.path || '',
        status: params.status || 'forward',
      } as NavigationMessage),
    );
    return true; // WebView에서 처리됨
  }

  return false; // WebView가 아니므로 `router.push` 실행해야 함
};
