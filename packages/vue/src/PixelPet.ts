import { defineComponent, onMounted, onUnmounted, watch, type PropType } from 'vue'
import { createPixelPet } from '@pixelpet/core'
import type { PetPosition, PetTheme, PetType, PixelPetInstance } from '@pixelpet/core'

export const PixelPet = defineComponent({
  name: 'PixelPet',
  props: {
    type: { type: String as PropType<PetType>, default: 'cat' },
    theme: { type: String as PropType<PetTheme>, default: 'orange' },
    size: { type: Number, default: undefined },
    /** Starting position: a corner preset or exact `{ x, y }` pixels. Not reactive — only read on mount. */
    position: { type: [String, Object] as PropType<PetPosition>, default: 'bottom-left' },
    enabled: { type: Boolean, default: true },
  },
  setup(props) {
    let instance: PixelPetInstance | null = null

    onMounted(() => {
      instance = createPixelPet({
        type: props.type,
        theme: props.theme,
        size: props.size,
        position: props.position,
      })
      if (!props.enabled) instance.pause()
    })

    watch(
      () => props.type,
      (type) => instance?.setType(type),
    )
    watch(
      () => props.theme,
      (theme) => instance?.setTheme(theme),
    )
    watch(
      () => props.enabled,
      (enabled) => (enabled ? instance?.resume() : instance?.pause()),
    )

    onUnmounted(() => {
      instance?.destroy()
      instance = null
    })

    // Headless: the pet renders itself as a fixed-position DOM node outside
    // Vue's tree, so this component contributes nothing to its own subtree.
    return () => null
  },
})

export default PixelPet
