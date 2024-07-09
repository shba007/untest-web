<script setup lang="ts">
const props = defineProps<{
  index: number,
  value: string,
  state: 'neutral' | 'selected' | 'wrong' | 'right',
}>()
</script>

<template>
  <div
    class="flex items-center gap-4 w-full h-12 rounded-full bg-dark-500 p-[6px] pr-4 cursor-pointer transition-[outline] ease-in"
    :class="{ 'outline outline-offset-2 outline-2 ': state !== 'neutral', 'outline-blue-400': state === 'selected', 'outline-alert-500': state === 'wrong', 'outline-success-500': state === 'right' }">
    <span
      class="flex-shrink-0 inline-flex justify-center items-center rounded-full size-9 aspect-square text-white transition-colors"
      :class="{ 'bg-primary-400': state === 'neutral' || state === 'selected', 'bg-alert-500': state === 'wrong', 'bg-success-500': state === 'right' }">
      {{ index }}
    </span>
    <span class="whitespace-nowrap overflow-x-scroll  scrollbar-hidden">{{ value }}</span>
  </div>
</template>