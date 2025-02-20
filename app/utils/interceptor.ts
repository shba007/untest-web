const authStore = useAuthStore()

export function getAuthHeaders() {
  return {
    authorization: `Bearer ${authStore.accessToken}`,
  }
}
