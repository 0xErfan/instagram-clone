<script setup lang="ts">

import { computed } from 'vue';
import type { Product } from '../tepmplates/ECommerce.vue';

const { data } = defineProps<{ data: Product & { removeCard: (name: string) => void, updateBasketItemCount: (name: string, count: number) => void, count: number } }>();
const { name, price, removeCard, updateBasketItemCount, imageSrc } = data

const count = computed(() => data.count)

</script>

<template>
  <div class="flex text-xl h-28 text-white/80 pt-8 justify-between gap-8">
    <div class="flex items-center gap-4 w-full border-b pb-2 border-black"><img :src="imageSrc"
        class="w-[40%] h-full rounded-md">
      <p class="text-xl">{{ name }}</p>
    </div>
    <p class="flex items-end pb-2 w-full border-b border-black">${{ price }}</p>
    <div class="flex items-center gap-4 w-full border-b border-black"><input
        @change="e => updateBasketItemCount(name, +(e.target as HTMLInputElement).value)" min="1"
        class="outline-0 text-black w-[50%] p-1 rounded-md" type="number" :value="count">
      <button @click="removeCard(name)"
        class="bg-red-500 hover:bg-red-600 duration-300 transition-colors w-[50%] text-white p-1 rounded-md">Remove</button>
    </div>
  </div>
</template>
