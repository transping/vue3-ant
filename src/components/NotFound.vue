<script setup lang="ts">
  import { useRoute } from 'vue-router'

  const route = useRoute()
</script>

<template>
  <h1 class="title">
    NotFound: {{ route.params.pathMatch }}!
  </h1>
  <h2>{{ route }}</h2>
  <div class="flex justify-center bg-gray-300 m-[20px]">
    <div class="mx-4 order-last self-center">
      <img src="/imgs/logo.png" class="rounded-full">
    </div>
    <div class="mx-4 self-center text-center">
      <h1 class="text-6xl font-bold text-blue-700 hover:underline">Welcome to NorthBy</h1>
      <h2 class="text-3xl font-semibold text-blue-300">A premium in sight and sound</h2>
      <button class="my-4 px-4 py-2 border-2 border-black rounded-lg text-white bg-blue-900">Learn More</button>
    </div>
  </div>
</template>

<style scoped>
</style>
