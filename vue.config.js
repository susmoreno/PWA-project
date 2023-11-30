const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: `src/service-worker.js?${Date.now()}` // Ajusta la ruta según tu estructura
      // Puedes configurar más opciones de Workbox aquí
    },
  },
};

module.exports = {
  devServer: {
    proxy: {
      '/encuesta': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
};
