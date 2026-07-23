# PixelPet 🐾

A tiny pixel-art pet that sits in a corner of your browser page and plays a looping idle animation. Framework-agnostic core, with a first-class Vue 3 integration.

```
type: cat, theme: orange
```

## Packages

| Package | Description |
| --- | --- |
| [`@pixelpet/core`](./packages/core) | Framework-agnostic engine: sprite registry + DOM renderer. Zero dependencies. |
| [`@pixelpet/vue`](./packages/vue) | Vue 3 integration — a `<PixelPet>` component and an `app.use()` plugin, both built on `@pixelpet/core`. |

`examples/vue3-demo` is a live Vite + Vue 3 playground.

## Install

```bash
pnpm add @pixelpet/vue
# @pixelpet/core is pulled in automatically as a dependency
```

## Quick start (Vue 3)

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

## Framework-agnostic usage (no Vue)

```ts
import { createPixelPet } from '@pixelpet/core'

const pet = createPixelPet({ type: 'cat', theme: 'orange' })

// later
pet.setTheme('dracula')
pet.pause()
pet.destroy()
```

## API

### `PixelPetOptions`

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'cat'` | `'cat'` | Which animal to render. Only `cat` exists today. |
| `theme` | `'orange' \| 'dracula' \| 'box'` | `'orange'` | Which sprite/skin to render. |
| `position` | corner preset or `{ x, y }` px | `'bottom-left'` | Starting placement. Presets: `'bottom-left'`, `'bottom-right'`, `'top-left'`, `'top-right'`. Fixed at mount time — not draggable. |
| `container` | `HTMLElement` | `document.body` | Element the pet is appended to (core only — the Vue component always mounts to `document.body`). |
| `size` | `number` | `64` | Rendered size in px. |

### `PixelPetInstance`

`setType(type)`, `setTheme(theme)`, `pause()`, `resume()`, `destroy()`.

New themes/types are added by extending the registry in `packages/core/src/assets/registry.ts` — no engine changes required.

## Architecture

- **Core is framework-agnostic.** `@pixelpet/core` has no dependency on Vue — a React/Svelte wrapper could reuse it the same way `@pixelpet/vue` does.
- **The pet is stationary.** Each theme is a single looping sprite (the bundled art is a sitting pose with a tail-flick animation, not a walk cycle), so the pet sits fixed at its starting `position` and never moves on its own.
- **Rendering is a `Renderer` interface** (`mount`/`update`/`setPaused`/`destroy`); the only implementation is `SpriteRenderer` — a DOM element whose background is a sprite-sheet stepped by a CSS animation.
- **Themes are dedicated sprites, not color filters** — each theme is its own sprite sheet rather than one base image recolored.
- **Asset source**: sprites under `packages/core/src/assets/cat/` come from the third-party CatPackFree pack (raw copies in `assets/source/cat/`). Confirm its license/attribution terms before publishing this package publicly.

## Monorepo development

```bash
pnpm install
pnpm -w build       # builds @pixelpet/core and @pixelpet/vue
pnpm -w test        # runs vitest across all packages
pnpm dev            # starts the vue3-demo dev server
```

```
pixelpet/
├── packages/
│   ├── core/   # @pixelpet/core
│   └── vue/    # @pixelpet/vue
├── examples/
│   └── vue3-demo/
└── assets/source/cat/   # raw third-party sprite pack
```

Versioning and npm publishing are handled with [Changesets](https://github.com/changesets/changesets): run `pnpm changeset` to record a change, `pnpm release` to build and publish.
