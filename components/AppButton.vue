<script setup lang="ts">
const { disabled = false } = defineProps<{
  title: string
  disabled?: boolean
  href?: string
  class?: string
}>()

const emit = defineEmits<{ (event: 'submit'): void }>()
</script>

<template>
  <NuxtLink v-if="href" :href="href" class="font-medium w-full rounded-2xl bg-primary-500 p-2.5 text-center text-lg text-white disabled:bg-dark-500" :class="class" :disabled="disabled">
    {{ title }}
  </NuxtLink>
  <button v-else class="font-medium w-full rounded-2xl bg-primary-500 p-2.5 text-center text-lg text-white disabled:bg-dark-500" :class="class" :disabled="disabled" @click="emit('submit')">
    {{ title }}
  </button>
</template>
