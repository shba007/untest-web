<script setup lang="ts">
const props = defineProps<{
  index: number
  value: string
  state: 'neutral' | 'selected' | 'wrong' | 'right'
}>()
</script>

<template>
  <div
    class="flex h-12 w-full cursor-pointer items-center gap-4 rounded-full bg-dark-500 p-[6px] pr-4 transition-[outline] ease-in"
    :class="{ 'outline outline-2 outline-offset-2': state !== 'neutral', 'outline-blue-400': state === 'selected', 'outline-alert-500': state === 'wrong', 'outline-success-500': state === 'right' }">
    <span
      class="inline-flex aspect-square size-9 flex-shrink-0 items-center justify-center rounded-full text-white transition-colors"
      :class="{ 'bg-primary-400': state === 'neutral' || state === 'selected', 'bg-alert-500': state === 'wrong', 'bg-success-500': state === 'right' }">
      {{ index }}
    </span>
    <span class="scrollbar-hidden overflow-x-scroll whitespace-nowrap">{{ value }}</span>
  </div>
</template>
