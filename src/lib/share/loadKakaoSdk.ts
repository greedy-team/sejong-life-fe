declare global {
  interface Window {
    Kakao: any;
  }
}

let kakaoSdkPromise: Promise<any> | null = null;

export function loadKakaoSdk(jsKey: string): Promise<any> {
  if (window.Kakao?.Share) {
    if (!window.Kakao.isInitialized()) window.Kakao.init(jsKey);
    return Promise.resolve(window.Kakao);
  }
  if (kakaoSdkPromise) return kakaoSdkPromise;

  kakaoSdkPromise = new Promise((resolve, reject) => {
    const onReady = () => {
      if (!window.Kakao) {
        reject(new Error('Kakao SDK failed to load'));
        return;
      }
      if (!window.Kakao.isInitialized()) window.Kakao.init(jsKey);
      resolve(window.Kakao);
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-sdk="true"]',
    );
    if (existing) {
      existing.addEventListener('load', onReady);
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.dataset.kakaoSdk = 'true';
    script.async = true;
    script.src = 'https://t1.kakao.com/kakao_js_sdk/2.7.4/kakao.min.js';
    script.onload = onReady;
    script.onerror = reject;

    document.head.appendChild(script);
  });

  return kakaoSdkPromise;
}
