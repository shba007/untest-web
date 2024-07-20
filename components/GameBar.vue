<script setup lang="ts">
const scores = defineProps<{
  opponent: {
    score: number
    question: number
  }
  player: {
    score: number
    question: number
  }
}>()

const health = computed(() => {
  if (!(scores.player.score + scores.opponent.score)) return 50

  return (scores.player.score / (scores.player.score + scores.opponent.score)) * 80 + 10
})
</script>

<template>
  <div class="relative">
    <div class="relative flex h-[92px] w-full overflow-hidden rounded-lg">
      <div class="min-h-max rounded-lg rounded-r-none border-r-[1px] border-black bg-alert-500 transition-[width] duration-200 ease-out" :style="{ width: `${100 - health}%` }" />
      <ProgressCircular :total="10" :value="scores.opponent" side="L" />
      <ProgressCircular :total="10" :value="scores.player" side="R" />
      <div class="min-h-max rounded-lg rounded-l-none border-l-[1px] border-black bg-primary-400 transition-[width] duration-200 ease-out" :style="{ width: `${health}%` }"></div>
    </div>
    <!-- <ProgressCircular :total="600" :value="540" class="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" /> -->
  </div>
</template>
