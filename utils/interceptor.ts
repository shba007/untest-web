const authStore = useAuthStore()

export function authInterceptor({ request, options }: { request: any; options: any }) {
  options.headers = options.headers || {}
  options.headers.authorization = `Bearer ${authStore.accessToken}`
}
