declare global {
  interface Window {
    kakao: any;
  }
}

let kakaoPromise: Promise<any> | null = null;

export function loadKakaoMap(appKey: string): Promise<any> {
  if (window.kakao?.maps?.MarkerClusterer) return Promise.resolve(window.kakao);
  if (kakaoPromise) return kakaoPromise;

  kakaoPromise = new Promise((resolve, reject) => {
    const onReady = () => {
      window.kakao.maps.load(() => {
        if (!window.kakao.maps.MarkerClusterer) {
          reject(new Error('Clusterer library failed to load'));
          return;
        }
        resolve(window.kakao);
      });
    };

    //중복방지
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-maps="true"]',
    );
    if (existing) {
      existing.addEventListener('load', onReady);
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.dataset.kakaoMaps = 'true';
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=clusterer`;
    script.onload = onReady;
    script.onerror = reject;

    document.head.appendChild(script);
  });

  return kakaoPromise;
}
