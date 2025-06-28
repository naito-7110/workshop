<script setup lang="ts">
  import { type InputHTMLAttributes } from 'vue'

  withDefaults(
    defineProps<{
      modelValue: string
      label?: string
      placeholder?: string
      required?: boolean
      type?: InputHTMLAttributes['type']
      disabled?: boolean
    }>(),
    {
      label: undefined,
      placeholder: undefined,
      required: true,
      type: 'text',
      disabled: false,
    }
  )
  const emits = defineEmits<{
    'update:modelValue': [string]
  }>()

  function onInput(e: Event) {
    const target = e.target as HTMLInputElement
    emits('update:modelValue', target.value)
  }
</script>

<template>
  <div :class="[$style.inputWrapper, { [$style.disabled]: disabled }]">
    <input
      :value="modelValue"
      @input="onInput"
      :placeholder="placeholder ?? ''"
      :id="label"
      :required="required"
      :type="type ?? 'text'"
      :disabled="disabled"
      autocomplete="off"
      :class="$style.input" />
    <label
      :for="label"
      :class="$style.label"
      >{{ label }}</label
    >
    <span :class="$style.border"></span>
  </div>
</template>

<style module lang="css">
  .inputWrapper {
    position: relative;
    margin: 1.5rem 0;
    width: 280px;
  }

  .disabled {
    input {
      background: #222;
      cursor: not-allowed;
      color: #555;
      border-color: #444 !important;
    }
  }

  .input {
    width: 100%;
    border: none;
    border-bottom: 2px solid #555;
    background: transparent;
    font-size: 1.1rem;
    padding: 10px 0 8px 0;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #1e90ff;
    }

    &:focus + .label,
    &.filled + .label {
      top: -20px;
      font-size: 0.85rem;
      color: #1e90ff;
    }
  }

  .label {
    position: absolute;
    left: 0;
    top: 10px;
    color: #999;
    font-size: 1rem;
    pointer-events: none;
    transition: 0.3s ease all;
  }

  .filled {
    .label {
      top: -20px;
      font-size: 0.85rem;
      color: #1e90ff;
    }
  }

  .border {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: #1e90ff;
    transition: width 0.3s ease;
  }

  .input:focus ~ .border {
    width: 100%;
  }
</style>
