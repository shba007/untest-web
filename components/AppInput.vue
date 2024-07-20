<script setup lang="ts">
const props = defineProps<{
  placeholder: string
  title: string
  type: 'text' | 'email'
}>()
const emits = defineEmits<{ (event: 'submit', value: string): void }>()

const value = ref()
</script>

<template>
  <div class="relative flex w-full rounded-full bg-dark-500 outline-2 outline-offset-2 outline-primary-500 focus-within:outline">
    <input v-model="value" :type="type" :placeholder="placeholder" class="flex-1 bg-transparent px-5 py-3 outline-none placeholder:normal-case" @keydown.enter="emits('submit', value)" />
    <button :disabled="!value" class="rounded-full bg-primary-500 px-5 py-3 disabled:bg-primary-500/20" @click="emits('submit', value)">
      {{ title }}
    </button>
  </div>
</template>
