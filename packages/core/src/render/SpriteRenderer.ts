import { getPetSprite } from '../assets/registry'
import type { EngineState, PetPosition } from '../types'
import type { Renderer } from './Renderer'

const STYLE_ID = 'pixelpet-keyframes'
const installedKeyframeNames = new Set<string>()

function getStyleSheet(): CSSStyleSheet | null {
  if (typeof document === 'undefined') return null
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null
  if (!style) {
    style = document.createElement('style')
    style.id = STYLE_ID
    document.head.appendChild(style)
  }
  return style.sheet
}

/**
 * Registers a @keyframes rule that steps background-position-x through exactly
 * `frameCount` pixel-aligned frames of `frameWidthPx` each. Using pixel offsets
 * (rather than percentages) avoids the classic sprite-animation footgun: with
 * percentage-based background-position, `steps(N)` only ever samples N-1/N of
 * the true travel distance, so every step lands short of the real frame
 * boundary and the sprite visibly drifts/slides instead of snapping cleanly.
 */
function ensureFrameKeyframes(frameCount: number, frameWidthPx: number): string {
  const name = `pixelpet-play-${frameCount}-${frameWidthPx}`
  if (installedKeyframeNames.has(name)) return name

  const sheet = getStyleSheet()
  if (sheet) {
    const totalTravelPx = frameCount * frameWidthPx
    sheet.insertRule(
      `@keyframes ${name} {
        from { background-position-x: 0px; }
        to { background-position-x: -${totalTravelPx}px; }
      }`,
      sheet.cssRules.length,
    )
  }
  installedKeyframeNames.add(name)
  return name
}

/** Applies a starting position to a fixed-position element: a corner preset, or exact `{x,y}` pixels. */
function applyPosition(el: HTMLElement, position: PetPosition): void {
  el.style.top = ''
  el.style.bottom = ''
  el.style.left = ''
  el.style.right = ''

  if (typeof position === 'object') {
    el.style.left = `${position.x}px`
    el.style.top = `${position.y}px`
    return
  }

  const [vertical, horizontal] = position.split('-') as ['top' | 'bottom', 'left' | 'right']
  el.style[vertical] = '0'
  el.style[horizontal] = '0'
}

/**
 * Renders the pet as a fixed-position DOM element whose background is a
 * horizontal sprite-sheet stepped by a CSS animation. Cheap, GPU-friendly,
 * no canvas/SVG required.
 */
export class SpriteRenderer implements Renderer {
  private el: HTMLDivElement | null = null
  private lastKey: string | null = null
  private readonly size: number
  private readonly position: PetPosition

  constructor(size = 64, position: PetPosition = 'bottom-left') {
    this.size = size
    this.position = position
  }

  mount(container: HTMLElement): void {
    const el = document.createElement('div')
    el.setAttribute('data-pixelpet', '')
    el.style.position = 'fixed'
    applyPosition(el, this.position)
    el.style.width = `${this.size}px`
    el.style.height = `${this.size}px`
    el.style.imageRendering = 'pixelated'
    el.style.pointerEvents = 'none'
    el.style.zIndex = '2147483647'
    el.style.backgroundRepeat = 'no-repeat'
    container.appendChild(el)
    this.el = el
  }

  update(state: EngineState): void {
    const el = this.el
    const key = `${state.type}:${state.theme}`
    if (!el || key === this.lastKey) return

    const sprite = getPetSprite(state.type, state.theme)
    const keyframesName = ensureFrameKeyframes(sprite.frameCount, this.size)

    el.style.backgroundImage = `url(${sprite.src})`
    // One rendered frame fills the element exactly; the sheet is frameCount times as wide.
    el.style.backgroundSize = `${sprite.frameCount * this.size}px ${this.size}px`
    el.style.animation = `${keyframesName} ${sprite.frameCount / sprite.fps}s steps(${sprite.frameCount}) infinite`
    this.lastKey = key
  }

  setPaused(paused: boolean): void {
    if (this.el) this.el.style.animationPlayState = paused ? 'paused' : 'running'
  }

  destroy(): void {
    this.el?.remove()
    this.el = null
  }
}
