export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>()
  const refreshToken = ref<string | null>()

  return { accessToken, refreshToken }
})