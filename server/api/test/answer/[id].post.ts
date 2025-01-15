export interface TestData {
  startTime: number
  endTime: number | null
  answers: { id: string; answer: number }[]
}

export default defineEventHandler(async (event) => {
  try {
    const userId = readAuth(event)
    const testId = getRouterParam(event, 'id')
    const { id, answer } = await readBody<{ id: string; answer: number }>(event)

    const testData = await useStorage('data').getItem<TestData>(`test:${userId}:${testId}`)
    if (!testData) throw createError({ statusCode: 400, statusMessage: 'testData is not defined' })

    const index = testData.answers.findIndex((answer) => answer.id === id)
    if (index !== -1) throw createError({ statusCode: 400, statusMessage: 'answer is already given' })

    testData.answers.push({ id, answer })

    await useStorage('data').setItem<TestData>(`test:${userId}:${testId}`, testData)
  } catch (error: unknown) {
    console.error('API test/answer/[id] POST', error)

    if (error instanceof Error && 'statusCode' in error) {
      throw error
    }

    throw createError({ statusCode: 500, statusMessage: 'Some Unknown Error Found' })
  }
})
