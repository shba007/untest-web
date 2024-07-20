<script setup lang="ts">
const props = defineProps<{
  name: string
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <div class="size-24 rounded-full border-[6px] border-white bg-primary-500"></div>
    <span>{{ name }}</span>
  </div>
</template>
