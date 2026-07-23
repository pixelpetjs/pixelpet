import { describe, expect, it } from 'vitest'
import { getPetSprite } from './registry'

describe('pet registry', () => {
  it('defines a sprite for each of the three bundled cat themes', () => {
    expect(getPetSprite('cat', 'orange').frameCount).toBe(10)
    expect(getPetSprite('cat', 'dracula').frameCount).toBe(6)
    expect(getPetSprite('cat', 'box').frameCount).toBe(4)
  })

  it('throws for an unregistered pet type', () => {
    // @ts-expect-error intentionally invalid type
    expect(() => getPetSprite('dog', 'orange')).toThrow()
  })

  it('throws for an unregistered theme', () => {
    // @ts-expect-error intentionally invalid theme
    expect(() => getPetSprite('cat', 'purple')).toThrow()
  })
})
