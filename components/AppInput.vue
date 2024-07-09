<script setup lang="ts">
const props = defineProps<{
  placeholder: string;
  title: string;
  type: 'text' | 'email';
}>()
const emits = defineEmits<{ (event: 'submit', value: string): void }>()

const value = ref()
</script>

<template>
  <div
    class="flex relative rounded-full w-full bg-dark-500 focus-within:outline outline-offset-2 outline-2 outline-primary-500">
    <input :type="type" :placeholder="placeholder" v-model="value"
      class="flex-1 px-5 py-3 bg-transparent outline-none placeholder:normal-case"
      @keydown.enter="emits('submit', value)" />
    <button :disabled="!value" class="rounded-full px-5 py-3 bg-primary-500 disabled:bg-primary-500/20"
      @click="emits('submit', value)">
      {{ title }}
    </button>
  </div>
</template>