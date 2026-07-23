import type { App, Plugin } from 'vue'
import { createPixelPet } from '@pixelpet/core'
import type { PixelPetOptions } from '@pixelpet/core'

/**
 * Global one-line setup: app.use(PixelPetPlugin, { type: 'cat', theme: 'orange' }).
 * Mounts a single pet to document.body for the lifetime of the page.
 */
export const PixelPetPlugin: Plugin = {
  install(_app: App, options: PixelPetOptions = {}) {
    if (typeof document === 'undefined') return

    const mount = () => createPixelPet(options)
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', mount, { once: true })
    } else {
      mount()
    }
  },
}
