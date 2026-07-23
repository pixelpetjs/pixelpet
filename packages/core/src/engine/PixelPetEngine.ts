import { SpriteRenderer } from '../render/SpriteRenderer'
import type { PetPosition, PetTheme, PetType, PixelPetInstance, PixelPetOptions } from '../types'
import type { Renderer } from '../render/Renderer'

const DEFAULTS = {
  type: 'cat' as PetType,
  theme: 'orange' as PetTheme,
  size: 64,
  position: 'bottom-left' as PetPosition,
}

export class PixelPetEngine implements PixelPetInstance {
  private type: PetType
  private theme: PetTheme
  private readonly renderer: Renderer

  constructor(options: PixelPetOptions = {}) {
    this.type = options.type ?? DEFAULTS.type
    this.theme = options.theme ?? DEFAULTS.theme
    const size = options.size ?? DEFAULTS.size
    const position = options.position ?? DEFAULTS.position
    const container = options.container ?? document.body

    this.renderer = new SpriteRenderer(size, position)
    this.renderer.mount(container)
    this.renderer.update({ type: this.type, theme: this.theme })
  }

  setType(type: PetType): void {
    this.type = type
    this.renderer.update({ type: this.type, theme: this.theme })
  }

  setTheme(theme: PetTheme): void {
    this.theme = theme
    this.renderer.update({ type: this.type, theme: this.theme })
  }

  pause(): void {
    this.renderer.setPaused(true)
  }

  resume(): void {
    this.renderer.setPaused(false)
  }

  destroy(): void {
    this.renderer.destroy()
  }
}
