<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore()
const authStore = useAuthStore()

const { name, email } = storeToRefs(userStore)
const isLoginError = ref<boolean>(false)

const { data, execute } = await useFetch('/api/auth/login', { method: 'post', body: { email }, immediate: false })

async function onSubmit(value: string) {
  userStore.update({ email: value })

  await execute()

  if (data.value) {
    authStore.accessToken = data.value.accessToken
    name.value = data.value.name
    router.push({ path: '/test' })
  } else {
    isLoginError.value = true
  }
}
</script>

<template>
  <main class="flex h-screen flex-col items-center justify-center gap-2">
    <AppToast v-if="isLoginError" type="alert" message="Login Failed enter correct email id" @close="isLoginError = false" />
    <h1 class="my-auto text-center align-middle text-xl">Welcome to Untest</h1>
    <ClientOnly>
      <AppInput type="email" placeholder="Email Address" title="Next" @submit="onSubmit" />
    </ClientOnly>
    <!-- <AppButton title="Next" href="/menu" /> -->
  </main>
</template>
