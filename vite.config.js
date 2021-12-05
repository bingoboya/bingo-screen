import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'apis': path.resolve(__dirname, 'src/apis'),
      'views': path.resolve(__dirname, 'src/views'),
      'utils': path.resolve(__dirname, 'src/utils'),
      'routes': path.resolve(__dirname, 'src/routes'),
      'styles': path.resolve(__dirname, 'src/styles'),
    }
  },
  server: {
    host: 'localhost',
    port: '8001'
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core']
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ]
})
