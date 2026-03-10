console.log('[main.js] loaded');

(function () {
    // ✅ 중복 실행 방지
    if (window.__heroSliderInit) return;
    window.__heroSliderInit = true;

    let intervalId = null;

    function extractUrlFromBg(bgValue) {
        // bgValue: url("...") or url('...') or none
        if (!bgValue || bgValue === 'none') return null;
        return bgValue.slice(5, -2); // url("...") 기준
    }

    function preloadAndDecode(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = url;

            // decode 지원 시: 디코딩까지 끝내서 전환 시 끊김 최소화
            if (img.decode) {
                img.decode().then(resolve).catch(resolve);
            } else {
                img.onload = () => resolve();
                img.onerror = () => resolve();
            }
        });
    }

    async function initHeroSlider() {
        const slider = document.getElementById('heroSlider');
        if (!slider) {
            console.warn('[hero] #heroSlider not found');
            return;
        }

        const slides = Array.from(slider.querySelectorAll('.hero-bg'));
        if (slides.length < 2) {
            console.warn('[hero] not enough slides:', slides.length);
            return;
        }

        // ✅ URL 목록 추출 (inline style background-image에서 뽑아옴)
        const urls = slides
            .map((s) => extractUrlFromBg(s.style.backgroundImage))
            .filter(Boolean);

        if (urls.length < 2) {
            console.warn('[hero] not enough urls extracted:', urls);
            return;
        }

        // ✅ 초기 active 정리 (active가 1개가 되도록)
        let idx = slides.findIndex((s) => s.classList.contains('active'));
        if (idx < 0) idx = 0;

        slides.forEach((s, i) => s.classList.toggle('active', i === idx));

        // ✅ (핵심) 모든 슬라이드 이미지를 미리 로드+디코드
        // 4장이라 부담 거의 없음. 덜컥의 1순위 원인 제거.
        console.log('[hero] preloading images...', urls);
        await Promise.all(urls.map(preloadAndDecode));
        console.log('[hero] preload done');

        // ✅ interval 중복 방지
        if (intervalId) clearInterval(intervalId);

        intervalId = setInterval(() => {
            const prev = idx;
            idx = (idx + 1) % slides.length;

            // ✅ 전환 안정화: 한 프레임 쉬고 클래스 토글
            // (브라우저가 opacity transition을 안정적으로 타게 해줌)
            slides[prev].classList.remove('active');
            requestAnimationFrame(() => {
                slides[idx].classList.add('active');
            });
        }, 6000);
    }

    // ✅ DOM 상태에 따라 안전 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroSlider);
    } else {
        initHeroSlider();
    }
})();