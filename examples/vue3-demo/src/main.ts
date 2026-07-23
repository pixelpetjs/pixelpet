import { createApp } from 'vue'
import App from './App.vue'

// Alternative one-line global setup (no live controls, just "set and forget"):
// import { PixelPetPlugin } from '@pixelpet/vue'
// createApp(App).use(PixelPetPlugin, { type: 'cat', theme: 'orange' }).mount('#app')

createApp(App).mount('#app')
