export const useTestStore = defineStore('test', () => {
  const id = ref<string | null>()
  const questions = ref<Question[]>([])
  const answers = ref<Answer[]>([])
  const { counter, pause, reset: counterReset, isActive: counterIsActive } = useInterval(1000, { controls: true })

  const stats = computed(() => {
    const [correctCount, incorrectCount] = answers.value.reduce(
      ([correctCount, incorrectCount], { id, answer }) => {
        const question = questions.value.find((question) => question.id === id)
        if (!question) return [correctCount, incorrectCount]

        return question.answer === answer ? [correctCount + 1, incorrectCount] : [correctCount, incorrectCount + 1]
      },
      [0, 0]
    )

    const duration = formatTime(convertSeconds(counter.value))

    return {
      correctCount,
      incorrectCount,
      duration,
    }
  })

  function addAnswer(answer: Answer) {
    if (!counterIsActive) {
      counterReset()
    }

    answers.value.push(answer)
  }

  function getResult() {
    if (counterIsActive) {
      pause()
    }

    return {
      testId: id.value,
      answers: answers.value,
    }
  }

  function reset() {
    id.value = null
    questions.value = []
    answers.value = []
  }

  return {
    id,
    questions,
    answers,
    stats,
    addAnswer,
    getResult,
    reset,
  }
})
