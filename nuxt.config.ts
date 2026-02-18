
export default defineNuxtConfig({
  compatibilityDate: '2026-02-16',
  devtools: { enabled: true },
  ssr: true,
  typescript: {
    strict: true,
  },
  css: [
    '@/assets/styles/normalize.scss',
    '@/assets/styles/main.scss',
    '@/assets/styles/header.scss',
    '@/assets/styles/footer.scss',
    '@/assets/styles/pages.scss',
    '@/assets/styles/product_card.scss',
  ],
  app: {
    head: {
      title: 'Tapir Digital',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})
