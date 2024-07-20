<script setup lang="ts">
const props = defineProps<{
  type: 'success' | 'warning' | 'alert'
  message: string
}>()
const emit = defineEmits<{ (event: 'close'): void }>()

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return 'toast-check'
    case 'warning':
      return 'toast-exclamation'
    case 'alert':
      return 'toast-cross'
  }
})
</script>

<template>
  <div class="text-gray-500 fixed left-1/2 top-5 mb-4 flex w-full max-w-xs -translate-x-1/2 items-center rounded-lg bg-dark-500 p-4 shadow" role="alert">
    <div class="text-green-500 bg-green-100 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg">
      <NuxtIcon :name="icon" filled class="text-[20px]" />
    </div>
    <div class="font-normal ms-3 text-sm">{{ message }}</div>
    <button
      type="button"
      class="text-gray-400 hover:text-gray-900 focus:ring-gray-300 hover:bg-gray-100 dark:text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 -mx-1.5 -my-1.5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-dark-400 p-1.5 focus:ring-2 dark:hover:text-white"
      @click="emit('close')">
      <NuxtIcon name="toast-close" class="text-[12px]" />
    </button>
  </div>
</template>
