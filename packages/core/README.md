# @pixelpet/core

Framework-agnostic engine for a pixel-art desktop pet that sits in a corner of the browser page and plays a looping idle animation. Zero dependencies.

For a Vue 3 integration, see [`@pixelpet/vue`](https://www.npmjs.com/package/@pixelpet/vue).

## Install

```bash
npm install @pixelpet/core
```

## Usage

```ts
import { createPixelPet } from '@pixelpet/core'

const pet = createPixelPet({ type: 'cat', theme: 'orange', position: 'bottom-right' })

// later
pet.setTheme('dracula')
pet.pause()
pet.destroy()
```

## API

### `createPixelPet(options?): PixelPetInstance`

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'cat'` | `'cat'` | Which animal to render. Only `cat` exists today. |
| `theme` | `'orange' \| 'dracula' \| 'box'` | `'orange'` | Which sprite/skin to render. |
| `position` | corner preset or `{ x, y }` px | `'bottom-left'` | Starting placement. Presets: `'bottom-left'`, `'bottom-right'`, `'top-left'`, `'top-right'`. Fixed at mount time — not draggable. |
| `container` | `HTMLElement` | `document.body` | Element the pet is appended to. |
| `size` | `number` | `64` | Rendered size in px. |

`PixelPetInstance`: `setType(type)`, `setTheme(theme)`, `pause()`, `resume()`, `destroy()`.

Full docs and architecture notes: [github.com/pixelpetjs/pixelpet](https://github.com/pixelpetjs/pixelpet).

## License

MIT
