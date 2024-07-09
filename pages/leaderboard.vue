<script setup lang="ts">
const lastCountPresets = [{
  id: '1',
  title: 'daily',
  count: 1
}, {
  id: '2',
  title: 'weekly',
  count: 7
}, /* {
  id: '3',
  title: 'this month',
  count: '2024-04-04'
}, */ {
  id: '4',
  title: 'all time',
  count: 100
}]

const activeLastCountId = ref<string | null>('1')

const lastCount = computed(() => {
  const datePreset = lastCountPresets.find(({ id }) => id == activeLastCountId.value)!
  return datePreset.count
})

const { data: users } = await useFetch('/api/user', { method: 'get', onRequest: authInterceptor, query: { lastCount: lastCount } })
</script>

<template>
  <main class="flex flex-col gap-8 items-center justify-start h-screen overflow-hidden">
    <h1 class="text-xl text-center align-middle">Leaderboard</h1>
    <div class="flex gap-2 w-full">
      <button v-for="{ id, title } in lastCountPresets" :key="id" class="flex-1 px-2 py-3  rounded-full capitalize"
        :class="activeLastCountId === id ? 'bg-primary-500' : 'bg-dark-500'" @click="activeLastCountId = id">
        {{ title }}
      </button>
    </div>
    <ul v-if="users" class="grow relative flex flex-col gap-6 w-full overflow-y-scroll">
      <li v-for="{ id, name, stats }, index in users" :key="id"
        class="flex items-center justify-between gap-3 p-3 rounded-full bg-dark-500">
        <span class="flex justify-center items-center h-full rounded-full aspect-square text-lg font-semi-bold"
          :class="{ 'bg-[#ffd700] text-black': index === 0, 'bg-[#c0c0c0] text-black': index === 1, 'bg-[#cd7f32] text-black': index === 2, 'bg-dark-400 text-white': index > 2 }">
          {{ index + 1 }}
        </span>
        <span>{{ name }}</span>
        <div class="ml-auto flex gap-3">
          <PointCard :point="stats.totalCorrectCount" color="blue" topic="Correct" size="compact" />
          <!-- <PointCard :point="stats.totalIncorrectCount" color="red" topic="Incorrect" size="compact" /> -->
          <PointCard :point="formatTime(convertSeconds(stats.totalDuration))" color="green" topic="Duration"
            size="compact" />
        </div>
      </li>
    </ul>
    <AppButton title="Go to main" href="/test" class="mt-auto" />
  </main>
</template>