<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const testStore = useTestStore()
const testId = route.params.id

const { data, pending, error } = useFetch(`/api/test/${testId}`, { method: 'get', onRequest: authInterceptor })

watch(data, (value) => {
  if (!value)
    return

  testStore.id = data.value.id
  testStore.questions = data.value.questions
})

const { count: correctCount, inc: incCorrect } = useCounter(0, { min: 0, max: 10 })
const { count: incorrectCount, inc: incIncorrect } = useCounter(0, { min: 0, max: 10 })
const totalCount = computed(() => correctCount.value + incorrectCount.value)
const item = computed(() => testStore.questions![totalCount.value])

const selectedAnswer = ref<number>()
const isSubmitted = ref(false)

function onOptionChange(index: number) {
  if (isSubmitted.value)
    return

  selectedAnswer.value = index + 1
}

const now = useNow({ interval: 500 })
const future = ref<number>()
const remaining = computed(() => Math.max(future.value ? (future.value - now.value.getTime()) / 1000 : 0, 0))

watch(remaining, () => {
  if (remaining.value === 0) {
    if (selectedAnswer.value === item.value.answer)
      incCorrect()
    else
      incIncorrect()

    selectedAnswer.value = undefined
    isSubmitted.value = false
  }
})

async function onSubmit() {
  const answerData = { id: item.value.id, answer: selectedAnswer.value! }
  testStore.addAnswer(answerData)

  isSubmitted.value = true
  future.value = now.value.getTime() + 2000

  await $fetch(`/api/test/answer/${testId}`, { method: 'post', body: answerData, onRequest: authInterceptor })
}

function calculateState(index: number) {
  if (selectedAnswer.value !== undefined && isSubmitted.value && index + 1 === item.value.answer)
    return 'right'

  if (selectedAnswer.value === index + 1) {
    if (isSubmitted.value)
      return selectedAnswer.value === item.value.answer ? 'right' : 'wrong'
    else
      return 'selected'
  } else
    return 'neutral'
}

watch(testStore.answers, async (value) => {
  if (value.length >= 10) {
    const { data, pending, error } = await useFetch(`/api/test`, {
      method: 'post', body: testStore.getResult(), onRequest: authInterceptor
    })
    router.push({ path: `/result/${testId}` })
  }
})
</script>

<template>
  <main class="flex-1 relative flex flex-col gap-4">
    <GameBar :player="{ question: correctCount, score: correctCount }"
      :opponent="{ question: incorrectCount, score: incorrectCount }" />
    <span class="opacity-50">Question {{ totalCount + 1 }}/10</span>
    <Transition mode="out-in" enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform translate-x-20  opacity-0" enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in" leave-from-class="transform translate-x-0  opacity-100"
      leave-to-class="transform -translate-x-20  opacity-0">
      <div class="flex-1 flex flex-col gap-4" v-if="item" :key="item.id">
        <h1
          class="grow text-lg font-medium bg-dark-500 overflow-y-auto px-4 py-2 rounded-xl scrollbar-hidden max-h-[263px]">
          {{ item.question }}
        </h1>
        <ul class="flex flex-col gap-6">
          <li v-for="option, index in item.options">
            <Option :index="index + 1" :value="option" :state="calculateState(index)" @click="onOptionChange(index)" />
          </li>
        </ul>
      </div>
    </Transition>
    <AppButton :title="remaining ? `Next in ${remaining.toFixed(0)}` : 'Submit'"
      :disabled="!!remaining || selectedAnswer === undefined" @submit="onSubmit" />
  </main>
</template>