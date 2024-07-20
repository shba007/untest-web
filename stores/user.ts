export const useUserStore = defineStore('user', () => {
  const name = ref<string | null>()
  const email = ref<string | null>()

  function update(value: { name?: string; email?: string }) {
    if (value.name) name.value = value.name
    if (value.email) email.value = value.email
  }

  return {
    name,
    email,
    update,
  }
})
