<script setup lang="ts">
  import type { ButtonHTMLAttributes } from 'vue'

  withDefaults(
    defineProps<{
      type?: ButtonHTMLAttributes['type']
      variant?: 'primary' | 'secondary'
    }>(),
    {
      type: 'button',
      variant: 'primary',
    }
  )

  const emits = defineEmits<{
    click: [e: Event]
  }>()
</script>
<template>
  <button
    :type="type"
    :class="$style['button']"
    :data-variant="variant"
    @click="emits('click', $event)">
    <slot />
  </button>
</template>
<style lang="css" module>
  .button {
    border: none;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button[data-variant='primary'] {
    background-color: #1e90ff;
    color: #fff;
  }

  .button[data-variant='primary']:hover {
    background-color: #005fcc;
  }

  .button[data-variant='secondary'] {
    background-color: #ccc;
    color: #333;
  }

  .button[data-variant='secondary']:hover {
    background-color: #999;
  }
</style>
