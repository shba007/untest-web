<script setup lang="ts">
const lastCountPresets = [
  {
    id: '1',
    title: 'daily',
    count: 1,
  },
  {
    id: '2',
    title: 'weekly',
    count: 7,
  },
  /* {
  id: '3',
  title: 'this month',
  count: '2024-04-04'
}, */ {
    id: '4',
    title: 'all time',
    count: 100,
  },
]

const activeLastCountId = ref<string | null>('1')

const lastCount = computed(() => {
  const datePreset = lastCountPresets.find(({ id }) => id == activeLastCountId.value)!
  return datePreset.count
})

const { data: users } = await useFetch('/api/user', { method: 'get', headers: getAuthHeaders(), query: { lastCount: lastCount } })
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-start gap-8 overflow-hidden">
    <h1 class="text-center align-middle text-xl">Leaderboard</h1>
    <div class="flex w-full gap-2">
      <button
        v-for="{ id, title } in lastCountPresets"
        :key="id"
        class="flex-1 rounded-full px-2 py-3 capitalize"
        :class="activeLastCountId === id ? 'bg-primary-500' : 'bg-dark-500'"
        @click="activeLastCountId = id">
        {{ title }}
      </button>
    </div>
    <ul v-if="users" class="relative flex w-full grow flex-col gap-6 overflow-y-scroll">
      <li v-for="({ id, name, stats }, index) in users" :key="id" class="flex items-center justify-between gap-3 rounded-full bg-dark-500 p-3">
        <span
          class="flex aspect-square h-full items-center justify-center rounded-full text-lg font-semi-bold"
          :class="{ 'bg-[#ffd700] text-black': index === 0, 'bg-[#c0c0c0] text-black': index === 1, 'bg-[#cd7f32] text-black': index === 2, 'bg-dark-400 text-white': index > 2 }">
          {{ index + 1 }}
        </span>
        <span>{{ name }}</span>
        <div class="ml-auto flex gap-3">
          <PointCard :point="stats.totalCorrectCount" color="blue" topic="Correct" size="compact" />
          <!-- <PointCard :point="stats.totalIncorrectCount" color="red" topic="Incorrect" size="compact" /> -->
          <PointCard :point="formatTime(convertSeconds(stats.totalDuration))" color="green" topic="Duration" size="compact" />
        </div>
      </li>
    </ul>
    <AppButton title="Go to main" href="/test" class="mt-auto" />
  </main>
</template>
