import orangeSrc from './cat/orange.png'
import draculaSrc from './cat/dracula.png'
import boxSrc from './cat/box.png'
import type { PetTheme, PetType, SpriteDefinition } from '../types'

/**
 * Each theme is a single self-contained looping sprite (the source art only
 * has stationary poses with a tail-flick animation, no walk cycle) — so a
 * theme here is a distinct dedicated sprite sheet, not a color filter applied
 * to a shared base. Adding a new theme is just adding an entry here.
 */
const catThemes: Record<PetTheme, SpriteDefinition> = {
  orange: { src: orangeSrc, frameWidth: 32, frameHeight: 32, frameCount: 10, fps: 6 },
  dracula: { src: draculaSrc, frameWidth: 32, frameHeight: 32, frameCount: 6, fps: 8 },
  box: { src: boxSrc, frameWidth: 32, frameHeight: 32, frameCount: 4, fps: 4 },
}

export const petRegistry: Record<PetType, Record<PetTheme, SpriteDefinition>> = {
  cat: catThemes,
}

export function getPetSprite(type: PetType, theme: PetTheme): SpriteDefinition {
  const themes = petRegistry[type]
  if (!themes) {
    throw new Error(`[pixelpet] Unknown pet type "${type}"`)
  }
  const sprite = themes[theme]
  if (!sprite) {
    throw new Error(`[pixelpet] Unknown theme "${theme}" for type "${type}"`)
  }
  return sprite
}
