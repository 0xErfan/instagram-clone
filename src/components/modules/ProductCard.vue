<script setup lang="ts">

import type { Product } from '../tepmplates/ECommerce.vue';

const { data } = defineProps<{ data: Product & { addToCard: (data: Product) => void } }>();
const { name, price, addToCard, imageSrc } = data

</script>

<template>
  <div
    class="flex flex-col justify-between gap-1 items-center overflow-hidden hover:-translate-y-2 min-h-[330px] duration-300 transition-all flex-grow rounded-xl p-4 bg-white text-center">
    <div class="w-full h-[65%]">
      <img class="size-full object-cover shrink-0" :src="imageSrc">
    </div>
    <div class="flex flex-col w-full">
      <div class="mt-auto">
        <p class="text-black text-xl min-h-14 line-clamp-2">{{ name }}</p>
        <p class="text-md text-gray-800">${{ price }}</p>
        <button @click="addToCard({ ...data })"
          class="outline-0 max-w-[95%] mt-4 w-full m-auto rounded-xl bg-black px-2 py-3 hover:text-yellow-400 text-white/80 duration-300 transition-colors">Buy
          now</button>
      </div>
    </div>
  </div>
</template>
