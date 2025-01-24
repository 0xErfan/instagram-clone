<script setup lang="ts">

import { computed, ref } from 'vue';

const temperature = ref(0)

const temperature_color = computed(() => {
  return temperature.value < 0 ? 'bg-blue-400' : (temperature.value > 0 && temperature.value < 5) ? 'bg-green-300' : 'bg-red-400'
})

</script>

<template>
  <section class="flex items-center justify-center w-full h-[500px] bg-pink-200">
    <div
      class="flex flex-col w-52 h-[300px] p-4 space-y-4 rounded-md bg-blue-950 *:flex *:items-center *:justify-center text-center shadow-black shadow-xl">
      <div
        :class='["border border-white duration-200 transition-all w-full h-[176px] rounded-full", temperature_color]'>
        <p class="text-white shadow-xl p-1 bg-inherit text-xl">{{ temperature }} °C</p>
      </div>
      <div class="gap-8 *:flex *:items-center *:justify-center">
        <button @click="temperature++"
          class="size-14 border border-white rounded-full duration-300 transition-all hover:bg-gray-600 p-px bg-gray-500">+</button>
        <button @click="temperature--"
          class="size-14 border border-white rounded-full duration-300 transition-all hover:bg-gray-400 p-px bg-gray-300">-</button>
      </div>
    </div>
  </section>
</template>
