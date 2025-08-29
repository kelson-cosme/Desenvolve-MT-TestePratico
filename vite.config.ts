import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Adicione esta seção de configuração do servidor
  server: {
    proxy: {
      // Redireciona requisições que começam com /api para o alvo
      '/api': {
        target: 'https://abitus-api.geia.vip',
        changeOrigin: true,
        // Reescreve o caminho: remove o '/api' antes de enviar
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})