const authStore = useAuthStore()

interface Options {
  headers?: { [key: string]: string }
}

export function authInterceptor({ options }: { options: Options }) {
  options.headers = options.headers || {}
  options.headers.authorization = `Bearer ${authStore.accessToken}`
}
