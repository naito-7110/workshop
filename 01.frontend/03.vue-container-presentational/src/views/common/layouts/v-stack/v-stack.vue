<script setup lang="ts"></script>

<template>
  <div :class="$style['v-stack']">
    <slot />
  </div>
</template>

<style lang="css" module>
  .v-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
