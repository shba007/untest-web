export default defineEventHandler<{ status: string }>(() => {
  return { status: 'OK' }
})
