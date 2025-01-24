<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue';
const counter = ref(0)
</script>

<template>
  <section class="w-full h-[500px] bg-sky-500/75 flex items-center justify-center">
    <div class="border border-black/30 bg-blue-400 text-center space-y-6 p-12 rounded-xl">
      <p class="text-2xl text-black">Counter</p>
      <p class="text-white text-2xl">{{ counter }}</p>
      <div class="flex items-center justify-between gap-4">
        <button @click="counter++"
          class="flex items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-gray-600 bg-gray-500 text-white text-xl rounded-xl">Inc</button>
        <button @click="counter--"
          class="flex items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-gray-600 bg-gray-500 text-white text-xl rounded-xl">Dec</button>
        <button @click="counter = 0"
          class="flex items-center justify-center p-4 cursor-pointer transition-all duration-300 hover:bg-gray-600 bg-gray-500 text-white text-xl rounded-xl">Reset</button>
      </div>
    </div>
  </section>
</template>
