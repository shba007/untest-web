<script setup lang="ts">
withDefaults(
  defineProps<{
    topic: string
    point: number | string
    color: 'red' | 'green' | 'blue'
    size?: 'compact' | 'standard'
  }>(),
  {
    size: 'standard',
  }
)
const emit = defineEmits<{ (event: 'click'): void }>()
</script>

<template>
  <div class="relative flex h-full flex-col gap-2 rounded-full bg-dark-500" :class="size === 'standard' ? 'w-[88px] pb-6' : 'w-[44px]'" @click="emit('click')">
    <div
      class="flex aspect-square items-center justify-center rounded-full"
      :class="[{ 'border-alert-500': color === 'red', 'border-primary-500': color === 'blue', 'border-success-500': color === 'green' }, size === 'standard' ? 'border-8 p-4' : 'border-2 p-2']">
      <span :class="size === 'standard' ? 'text-xl' : 'text-sm'">{{ point }}</span>
    </div>
    <span v-if="size === 'standard'" class="text-center text-sm capitalize">{{ topic }}</span>
  </div>
</template>
