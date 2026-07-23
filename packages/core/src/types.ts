export type PetType = 'cat'

export type PetTheme = 'orange' | 'dracula' | 'box'

export type PetCorner = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

/** A corner preset, or an exact `{ x, y }` pixel position (from the top-left of the viewport). */
export type PetPosition = PetCorner | { x: number; y: number }

export interface SpriteDefinition {
  src: string
  frameWidth: number
  frameHeight: number
  frameCount: number
  fps: number
}

export interface PixelPetOptions {
  type?: PetType
  theme?: PetTheme
  /** Element the pet is appended to. Defaults to document.body. */
  container?: HTMLElement
  /** Rendered size in pixels (sprite frames are scaled to this square size). */
  size?: number
  /** Starting position: a corner preset or exact `{ x, y }` pixels. Defaults to `'bottom-left'`. */
  position?: PetPosition
}

export interface PixelPetInstance {
  setType(type: PetType): void
  setTheme(theme: PetTheme): void
  pause(): void
  resume(): void
  destroy(): void
}

export interface EngineState {
  type: PetType
  theme: PetTheme
}

export interface Renderer {
  mount(container: HTMLElement): void
  update(state: EngineState): void
  setPaused(paused: boolean): void
  destroy(): void
}
