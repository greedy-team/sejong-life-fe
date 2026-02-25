declare global {
  interface Window {
    kakao: any;
  }
}

export function loadKakaoMap(appKey: string): Promise<any> {
  return new Promise((resolve, reject) => {
    //이미 있는 경우
    if (
      window.kakao &&
      window.kakao.maps &&
      window.kakao.maps.MarkerClusterer
    ) {
      resolve(window.kakao);
      return;
    }

    //중복방지
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-kakao-maps="true"]',
    );
    if (existing) {
      existing.addEventListener('load', () => {
        window.kakao.maps.load(() => resolve(window.kakao));
      });
      existing.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.dataset.kakaoMaps = 'true';
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false&libraries=clusterer`;
    script.onload = () => {
      if (window.kakao.maps.MarkerClusterer) {
        window.kakao.maps.load(() => {
          resolve(window.kakao);
        });
      } else {
        reject(new Error('Clusterer library failed to load'));
      }
    };
    script.onerror = reject;

    document.head.appendChild(script);
  });
}
