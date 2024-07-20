<script setup lang="ts">
const title = `Untest`
const description = `Learn by quick question answer competition with peers`
const url = "https://untest.monalisa-bairagi.com"

useSeoMeta({
  ogType: "profile",
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: url + "/previews/landing.webp",
  ogImageWidth: 1280,
  ogImageHeight: 640,
  ogUrl: url,
  fbAppId: 966242223397117,
  twitterCard: "summary_large_image",
  colorScheme: "dark light",
})

useSchemaOrg([
  defineWebPage({
    datePublished: new Date(2024, 4, 30).toISOString(),
    dateModified: new Date(2024, 4, 30).toISOString(),
    author: "Shirsendu Bairagi",
  }),
  defineWebSite({
    url: url,
    name: title,
    description: description,
  }),
])
</script>

<template>
  <NuxtRouteAnnouncer />
  <!-- <NuxtPwaManifest /> -->
  <!-- <NuxtPwaAssets /> -->
  <!-- <NuxtLoadingIndicator /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- <AppInstallPrompt /> -->
</template>

<style>
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-tap-highlight-color: transparent;
  scrollbar-width: 6px
}

*::-webkit-scrollbar {
  @apply block size-[6px] bg-dark-400;
}

*::-webkit-scrollbar-thumb {
  @apply rounded-md bg-dark-600;
}

html {
  @apply relative scroll-smooth overflow-x-hidden;
}

body {
  @apply relative min-h-screen text-white bg-dark-400 overflow-x-hidden;
}

.nuxt-icon>svg {
  @apply !m-0;
}

.scrollbar-hidden {
  -ms-overflow-style: none;
  /* Internet Explorer 10+ */
  scrollbar-width: none;
  /* Firefox */
}

.scrollbar-hidden::-webkit-scrollbar {
  display: none;
  /* Safari and Chrome */
}
</style>