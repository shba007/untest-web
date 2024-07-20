<script setup lang="ts">
const router = useRouter()
const testStore = useTestStore()

const { data: days } = useFetch('/api/test', { method: 'get', onRequest: authInterceptor })

function goToTest(id: string, isComplete: boolean) {
  if (!isComplete) router.push({ path: `/test/${id}` })
  else router.push({ path: `/result/${id}` })
}

onMounted(() => {
  testStore.reset()
})
</script>

<template>
  <main class="flex h-screen flex-col items-center gap-4 overflow-hidden">
    <h1 class="text-lg">All Tests</h1>
    <section class="relative grid w-full grow grid-cols-4 justify-between gap-2 overflow-y-scroll">
      <TopicCard
        v-for="({ id, createdAt, isComplete }, index) of days"
        :key="id"
        :topic="(index + 1).toString()"
        :color="index % 2 === 0 ? 'red' : 'blue'"
        :done="isComplete"
        @click="goToTest(id, isComplete)" />
    </section>
    <span />
    <AppButton title="Go to Leaderboard" href="/leaderboard" class="mt-auto" />
    <!-- <h1>Join a Room</h1> -->
    <!-- <AppInput placeholder="Code" title="Join" /> -->
  </main>
</template>
