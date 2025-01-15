<script setup lang="ts">
const props = defineProps<{
  total: number
  value:
    | {
        score: number
        question: number
      }
    | number
  side?: 'L' | 'R'
}>()

const percentage = computed(() => {
  if (typeof props.value === 'number') return Math.round((props.value / props.total) * 100) / 100
  else return (Math.round((props.value.question / props.total) * 100) / 100) * 0.45
})
</script>

<template>
  <div
    :class="{
      'absolute left-0 top-1/2 w-[7rem] -translate-x-[50%] -translate-y-1/2': side === 'L',
      'absolute right-0 top-1/2 w-[7rem] -translate-y-1/2 translate-x-[50%]': side === 'R',
      'scale-75 border border-dashed border-black': side === undefined,
    }"
    class="flex aspect-square items-center justify-center rounded-full bg-dark-400">
    <div class="relative h-fit w-fit">
      <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="48" cy="48" r="43.2" class="stroke-white" stroke-width="6" />
        <circle
          cx="48"
          cy="48"
          r="43.2"
          stroke-linecap="round"
          :class="{ 'stroke-alert-500': side === 'L', 'stroke-primary-400': side === 'R', 'stroke-success-500': side === undefined }"
          stroke-width="6"
          stroke-dasharray="270"
          :stroke-dashoffset="(side === 'L' ? -1 : 1) * 270 * (1 - percentage)"
          :transform="`rotate(${side === undefined ? '-' : ''}90 48 48)`" />
      </svg>
      <span
        class="font-head absolute top-1/2 -translate-y-1/2 text-2xl text-white"
        :class="{ 'right-[26px]': side === 'L', 'left-[26px]': side === 'R', 'left-1/2 -translate-x-1/2': side === undefined }">
        {{ typeof value === 'number' ? value : value.score }}
      </span>
    </div>
  </div>
</template>
