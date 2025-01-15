<script setup lang="ts">
defineProps<{
  topic: string
  done: boolean
  // icon: string,
  color: 'red' | 'blue' | 'green'
}>()
const emit = defineEmits<{ (event: 'click'): void }>()
</script>

<template>
  <div class="flex flex-col gap-2 rounded-full bg-dark-500 pb-6" @click="emit('click')">
    <div class="flex aspect-square items-center justify-center rounded-full border-8 p-4" :class="{ 'border-alert-500': !done, 'border-primary-500': done }">
      <!-- <NuxtIcon :name="icon" class="text-[48px]" /> -->
      <div class="text-xl">
        {{ topic }}
      </div>
    </div>
    <span class="text-center text-sm capitalize">{{ done ? 'done' : 'take' }}</span>
  </div>
</template>
