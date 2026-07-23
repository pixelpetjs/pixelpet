<script setup lang="ts">
import { ref } from 'vue'
import { PixelPet } from '@pixelpet/vue'
import type { PetCorner, PetTheme } from '@pixelpet/vue'

const theme = ref<PetTheme>('orange')
const enabled = ref(true)
const position = ref<PetCorner>('bottom-left')

const themes: { value: PetTheme; label: string }[] = [
  { value: 'orange', label: 'orange (idle)' },
  { value: 'dracula', label: 'dracula' },
  { value: 'box', label: 'box' },
]

const positions: { value: PetCorner; label: string }[] = [
  { value: 'bottom-left', label: 'bottom-left (default)' },
  { value: 'bottom-right', label: 'bottom-right' },
  { value: 'top-left', label: 'top-left' },
  { value: 'top-right', label: 'top-right' },
]
</script>

<template>
  <main class="panel">
    <h1>🐾 PixelPet demo</h1>
    <p>The pet sits in place and plays its idle loop — it does not move on its own.</p>
    <p class="note">
      type is always "cat" for now — only theme varies. Position is a starting placement, not
      draggable, so changing it below remounts the pet (note the <code>:key</code> on
      &lt;PixelPet&gt;).
    </p>

    <label>
      Theme
      <select v-model="theme">
        <option v-for="t in themes" :key="t.value" :value="t.value">{{ t.label }}</option>
      </select>
    </label>

    <label>
      Position
      <select v-model="position">
        <option v-for="p in positions" :key="p.value" :value="p.value">{{ p.label }}</option>
      </select>
    </label>

    <label>
      <input v-model="enabled" type="checkbox" />
      Enabled
    </label>
  </main>

  <PixelPet :key="position" type="cat" :theme="theme" :position="position" :enabled="enabled" />
</template>

<style scoped>
.panel {
  max-width: 32rem;
  margin: 3rem auto;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  font-family: system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.note {
  margin: -0.5rem 0 0;
  font-size: 0.8rem;
  color: #888;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9rem;
}
</style>
