import { PixelPetEngine } from './engine/PixelPetEngine'
import type { PixelPetInstance, PixelPetOptions } from './types'

export function createPixelPet(options: PixelPetOptions = {}): PixelPetInstance {
  return new PixelPetEngine(options)
}

export type {
  PetCorner,
  PetPosition,
  PetTheme,
  PetType,
  PixelPetInstance,
  PixelPetOptions,
  Renderer,
  SpriteDefinition,
} from './types'
export { petRegistry } from './assets/registry'
