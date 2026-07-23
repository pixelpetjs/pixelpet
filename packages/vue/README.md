# @pixelpet/vue

Vue 3 integration for [`@pixelpet/core`](https://www.npmjs.com/package/@pixelpet/core) — a pixel-art desktop pet that sits in a corner of the browser page and plays a looping idle animation.

## Install

```bash
npm install @pixelpet/vue
# @pixelpet/core is pulled in automatically as a dependency
```

## Usage

**Plugin — one line, global pet for the whole app:**

```ts
import { createApp } from 'vue'
import { PixelPetPlugin } from '@pixelpet/vue'
import App from './App.vue'

createApp(App)
  .use(PixelPetPlugin, { type: 'cat', theme: 'orange' })
  .mount('#app')
```

**Component:**

```vue
<script setup lang="ts">
import { PixelPet } from '@pixelpet/vue'
</script>

<template>
  <PixelPet type="cat" theme="orange" position="bottom-right" />
</template>
```

The component renders nothing into the page's layout — it mounts the pet as a fixed-position element on `document.body`.

## Props / Options

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'cat'` | `'cat'` | Which animal to render. Only `cat` exists today. |
| `theme` | `'orange' \| 'dracula' \| 'box'` | `'orange'` | Which sprite/skin to render. |
| `position` | corner preset or `{ x, y }` px | `'bottom-left'` | Starting placement — read once on mount, not reactive. |
| `size` | `number` | `64` | Rendered size in px. |
| `enabled` | `boolean` | `true` | Reactive — toggling pauses/resumes the pet. |

Full docs and architecture notes: [github.com/pixelpetjs/pixelpet](https://github.com/pixelpetjs/pixelpet).

## License

MIT
