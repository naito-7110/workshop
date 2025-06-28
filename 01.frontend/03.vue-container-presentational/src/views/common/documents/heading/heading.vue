<script setup lang="ts">
  withDefaults(
    defineProps<{
      h?: 1 | 2 | 3 | 4 | 5 | 6
    }>(),
    {
      h: 1,
    }
  )
</script>

<template>
  <component
    :is="`h${h}`"
    :class="[$style.heading, `h${h}` && $style['with-default']]">
    <slot />
  </component>
</template>

<style module scoped>
  .heading {
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0.5em;
    color: #222;
  }

  .heading:is(h1) {
    font-size: 2rem;
  }
  .heading:is(h2) {
    font-size: 1.5rem;
  }
  .heading:is(h3) {
    font-size: 1.25rem;
  }
  .heading:is(h4) {
    font-size: 1.125rem;
  }
  .heading:is(h5) {
    font-size: 1rem;
  }
  .heading:is(h6) {
    font-size: 0.875rem;
  }

  .with-default {
    max-width: 720px;
    margin-inline: auto;
    padding-inline: 1rem;
  }
</style>
