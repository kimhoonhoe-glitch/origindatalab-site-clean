import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // 정적 호스팅, 서브폴더 배포까지 모두 안전
  base: './',

  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        dataOverview: resolve(__dirname, 'data-overview.html'),
        useCases: resolve(__dirname, 'use-cases.html'),
        autonomousDriving: resolve(__dirname, 'autonomous-driving.html'),
        legalTransparency: resolve(__dirname, 'legal-transparency.html'),
        contact: resolve(__dirname, 'contact.html'),
        company: resolve(__dirname, 'company.html'),
      },
    },
  },
})