/**
 * 현재 환경이 WebView인지 여부를 반환합니다.
 */
export function isWebView(): boolean {
  if (typeof navigator === 'undefined') return false;

  const userAgent = navigator.userAgent.toLowerCase();

  // Android WebView: wv 또는 version/... + chrome/... + mobile
  const isAndroidWebView =
    /wv|android.*version\/[\d.]+.*chrome\/[.\d]+ mobile/i.test(userAgent);

  // iOS WebView: iOS 기기인데 Safari가 아닌 경우
  const isIOSWebView =
    /iphone|ipod|ipad/i.test(userAgent) && !/safari/i.test(userAgent);

  return isAndroidWebView || isIOSWebView;
}
